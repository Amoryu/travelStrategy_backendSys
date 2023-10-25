<template>
	<div class="card">
		<div style="display: flex; align-items: center" v-if="globalStore.userInfo.role === 'superManager'">
			<h3 style="margin: 10px">攻略类型</h3>
			<el-select
				v-model="form.type"
				class="m-2"
				placeholder="请选择攻略"
				size="large"
				@change="handleStrategyTypeSelect"
			>
				<el-option v-for="(item, index) in strategyTypeList" :key="index" :label="item.name" :value="item.name" />
			</el-select>
			<el-button class="btn" type="primary" @click="handleStrategy('添加攻略')">
				<el-icon>
					<Plus />
				</el-icon>
				添加攻略
			</el-button>
		</div>
		<el-divider v-if="globalStore.userInfo.role === 'superManager'" />

		<!-- 数据表格 -->
		<MyTable :table-data="strategyList" :columns="columns">
			<template #type="{ row }">
				<el-tag size="large">{{ row.type }}</el-tag>
			</template>
			<template #coverImg="{ row }">
				<el-image :src="row.coverImg" fit="contain" />
			</template>
			<template #operation="{ row }">
				<el-button icon="View" size="small" type="success" @click="handleClick(row)" />
				<el-button icon="Edit" size="small" type="primary" @click="handleStrategy('编辑攻略', row)" />
				<!-- <el-button icon="Delete" size="small" type="danger" @click="handleStrategy('delete', row)" /> -->
				<el-popconfirm title="确定删除吗?" @confirm="handleStrategy('删除攻略', row)">
					<template #reference>
						<el-button icon="Delete" size="small" type="danger" />
					</template>
				</el-popconfirm>
			</template>
		</MyTable>

		<!-- 详情抽屉 -->
		<el-drawer z-index="99" v-model="isViewInfo" title="攻略详情" direction="rtl" size="50%">
			<MyDescription :data="drawerData" :items="items" :column="1">
				<template #location>
					<span v-if="drawerData.province !== 'null'">{{ `${CodeToText[drawerData.province]}` }}</span>
					<span v-if="drawerData.city !== 'null'">{{ ` / ${CodeToText[drawerData.city]}` }}</span>
					<span v-if="drawerData.area !== 'null'">{{ ` / ${CodeToText[drawerData.area]}` }}</span>
				</template>
				<template #coverImg>
					<UploadImg :image-url="drawerData.coverImg" :disabled="true" />
				</template>
			</MyDescription>
		</el-drawer>

		<!-- 编辑弹窗 -->
		<el-dialog v-model="dialogFormVisible" :title="dialogTitle">
			<MyForm :formData="form" :items="items">
				<template #content>
					<el-input :rows="5" type="textarea" v-model="form.content" autocomplete="off" />
				</template>
				<template #type>
					<el-select v-model="form.type" @change="handleTypeChange">
						<el-option v-for="(item, i) in strategyTypeList" :key="i" :label="item.name" :value="item.name" />
					</el-select>
				</template>
				<template #location>
					<MyRegionSelect
						:width="150"
						:gap="0"
						:province="form.province"
						:city="form.city"
						:area="form.area"
						@get-province="getProvince"
						@get-city="getCity"
						@get-area="getArea"
					/>
				</template>

				<template #coverImg>
					<UploadImg v-model:image-url="form.coverImg" />
				</template>

				<template #perCost>
					<el-input-number v-model="form.perCost" :min="0" size="large" />
				</template>
			</MyForm>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel">取消</el-button>
					<el-button type="primary" @click="handleStrategySubmit(dialogTitle === '添加攻略' ? 'add' : 'edit')">{{
						dialogTitle === "添加攻略" ? "添加" : "保存"
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="strategyManage">
import MyTable from "@/components/MyTable/index.vue";
import MyForm from "@/components/MyForm/index.vue";
import MyDescription from "@/components/MyDescription/index.vue";
import MyRegionSelect from "@/components/MyRegionSelect/index.vue";
import { CodeToText } from "element-china-area-data";
import UploadImg from "@/components/Upload/Img.vue";
import { addStrategy, getStrategy, getStrategyType, editStrategy, deleteStrategy } from "@/api/modules/strategy";

import { useState } from "./useState";
import { useHandler } from "@/hooks/useHandler";

const globalStore = JSON.parse(localStorage.getItem("GlobalState") as string);

const { items, columns, form, strategyTypeList, strategyList } = useState();

const { dialogTitle, dialogFormVisible, isViewInfo, drawerData, operationHandler, showMessage, handleClick, cancel } =
	useHandler();

const initData = async () => {
	form.value.userName = globalStore.userInfo.username;
	if (globalStore.userInfo.role !== "superManager") {
		strategyList.value = (await getStrategy({ userName: form.value.userName }))?.data;
		return;
	}
	strategyList.value = (await getStrategy({ type: "" }))?.data;
	const { data } = await getStrategyType();
	strategyTypeList.value = data.filter((item: { isShow: number | boolean }) => item.isShow);
};

const getProvince = (province: string) => {
	form.value.province = province;
	form.value.provinceName = CodeToText[province];
	form.value.city = "";
	form.value.area = "";
};

const getCity = (city: string) => {
	form.value.city = city;
	form.value.cityName = CodeToText[city];
	form.value.area = "";
};

const getArea = (area: string) => {
	form.value.area = area;
	form.value.areaName = CodeToText[area];
};
const handleStrategyTypeSelect = async e => {
	strategyList.value = (await getStrategy({ type: e }))?.data;
};

const handleStrategySubmit = async (operation: string) => {
	const api = operation === "add" ? addStrategy : editStrategy;
	const res = await api(form.value);
	showMessage(res);
	cancel();
	await initData();
};

const handleTypeChange = (e: Object) => {
	console.log(e);
};

const handleStrategy = async (operation: string, row = {}) => {
	await operationHandler(operation, row, deleteStrategy, form, initData);
};

initData();
</script>

<style scoped>
.btn {
	margin-left: 20px;
	width: 100px;
	height: 40px;
}
</style>
