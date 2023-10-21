<template>
	<div class="card" v-if="auth">
		<div style="display: flex; align-items: center">
			<h3 style="margin: 10px">所在省市区</h3>
			<!-- <RegionSelect @getAddress="getAddress"></RegionSelect> -->
			<MyRegionSelect
				:width="150"
				:gap="10"
				:province="location.province"
				:city="location.city"
				:area="location.area"
				@get-province="getProvince"
				@get-city="getCity"
				@get-area="getArea"
			/>
			<el-button class="btn" plain type="primary" @click="initData">全部区域</el-button>
			<el-button class="btn" type="primary" @click="handleScenery('添加景点')">
				<el-icon>
					<Plus />
				</el-icon>
				添加景点
			</el-button>
		</div>
		<el-divider />

		<MyTable :table-data="sceneList" :columns="columns">
			<template #image="{ row }">
				<el-image :src="row.image" fit="contain" />
			</template>
			<template #isOpen="{ row }">
				<el-switch
					v-model="row.isOpen"
					class="ml-2"
					width="60"
					inline-prompt
					active-text="开放"
					inactive-text="暂停"
					@change="handleSceneryOpen(row)"
				/>
			</template>
			<template #operation="{ row }">
				<el-button icon="View" size="small" type="success" @click="handleClick(row)" />
				<el-button icon="Edit" size="small" type="primary" @click="handleScenery('编辑景点', row)" />
				<!-- <el-button icon="Delete" size="small" type="danger" @click="handleScenery('delete', row)" /> -->
				<el-popconfirm title="确定删除吗?" @confirm="handleScenery('删除景点', row)">
					<template #reference>
						<el-button icon="Delete" size="small" type="danger" />
					</template>
				</el-popconfirm>
			</template>
		</MyTable>

		<el-drawer z-index="99" v-model="isViewInfo" title="景点详情" direction="rtl" size="50%">
			<MyDescription :data="drawerData" :items="items" :column="1">
				<template #province>
					<div>
						{{ `${CodeToText[drawerData.province]} / ${CodeToText[drawerData.city]} / ${CodeToText[drawerData.area]}` }}
					</div>
				</template>
				<template #image>
					<UploadImg :image-url="drawerData.image" :disabled="true" />
				</template>
			</MyDescription>
		</el-drawer>

		<el-dialog v-model="dialogFormVisible" :title="dialogTitle">
			<MyForm :formData="form" :items="items">
				<template #province>
					<MyRegionSelect
						:width="150"
						:gap="10"
						:province="form.province"
						:city="form.city"
						:area="form.area"
						@get-province="getProvince"
						@get-city="getCity"
						@get-area="getArea"
					/>
				</template>

				<template #image>
					<UploadImg v-model:image-url="form.image" />
				</template>
				<template #description>
					<el-input type="textarea" autosize v-model="form.description" autocomplete="off" />
				</template>
			</MyForm>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel">取消</el-button>

					<el-button v-if="dialogTitle === '添加景点'" type="primary" @click="addScenerySubmit">添加</el-button>
					<el-button v-else type="primary" @click="editScenerySubmit">保存</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<div class="card" v-else>
		<el-empty description="无访问权限" />
	</div>
</template>

<script setup lang="ts" name="sceneryManage">
import MyTable from "@/components/MyTable/index.vue";
import MyForm from "@/components/MyForm/index.vue";
import MyDescription from "@/components/MyDescription/index.vue";
import MyRegionSelect from "@/components/MyRegionSelect/index.vue";
import UploadImg from "@/components/Upload/Img.vue";
import {
	getScenery,
	addScenery,
	editScenery,
	getAllScenery,
	setSceneryOpen,
	deleteScenery
} from "@/api/modules/scenery";
import { CodeToText } from "element-china-area-data";
import { GlobalStore } from "@/stores";
import { ElMessage } from "element-plus";
import { useState } from "./useState";
import { useHandler } from "@/hooks/useHandler";

const globalStore = GlobalStore();

const { items, columns, form, sceneList, location } = useState();

const {
	auth,
	dialogTitle,
	dialogFormVisible,
	isViewInfo,
	drawerData,
	showMessage,
	handleClick,
	cancel,
	operationHandler
} = useHandler();

const handleSceneryOpen = async ({ name, isOpen }) => {
	const res = await setSceneryOpen({ name, isOpen });
	if (res.code === 200) {
		form.value.isOpen = isOpen;
		showMessage(res);
	}
};

const getProvince = async (province: string) => {
	const res = dialogTitle.value === "编辑景点" ? form : location;
	res.value.province = province;
	res.value.city = "";
	res.value.area = "";
	if (dialogTitle.value === "编辑景点") {
		res.value.provinceName = CodeToText[province];
	} else {
		sceneList.value = (await getScenery(res.value))?.data;
	}
};

const getCity = async (city: string) => {
	const res = dialogTitle.value === "编辑景点" ? form : location;
	res.value.city = city;
	res.value.area = "";
	if (dialogTitle.value === "编辑景点") {
		res.value.cityName = CodeToText[city];
	} else {
		sceneList.value = (await getScenery(res.value))?.data;
	}
};

const getArea = async (area: string) => {
	const res = dialogTitle.value === "编辑景点" ? form : location;
	res.value.area = area;
	if (dialogTitle.value === "编辑景点") {
		res.value.areaName = CodeToText[area];
	} else {
		sceneList.value = (await getScenery(res.value))?.data;
	}
};

const handleScenery = async (operation: string, row = {}) => {
	await operationHandler(operation, row, deleteScenery, form, initData);
};

const addScenerySubmit = async () => {
	const res = await addScenery(form.value);
	showMessage(res);
	cancel();
	await initData();
};

const editScenerySubmit = async () => {
	const res = await editScenery(form.value);
	showMessage(res);
	cancel();
	const { province, city, area } = form.value;
	sceneList.value = (await getScenery({ province, city, area }))?.data;
};

const initData = async () => {
	Object.keys(location.value).forEach(key => (location.value[key] = ""));
	auth.value = ["sceneryManager", "superManager"].includes(globalStore.userInfo.role);
	if (auth.value) {
		sceneList.value = (await getAllScenery())?.data;
	}
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
