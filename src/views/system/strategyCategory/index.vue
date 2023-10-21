<template>
	<div class="card" v-if="auth">
		<el-button class="btn" type="primary" @click="handleStrategyType('添加类型')">
			<el-icon>
				<Plus />
			</el-icon>
			添加攻略类型
		</el-button>

		<MyTable :table-data="strategyTypeList" :columns="columns">
			<template #isShow="{ row }">
				<el-switch
					v-model="row.isShow"
					class="ml-2"
					width="60"
					inline-prompt
					active-text="展示"
					inactive-text="关闭"
					@change="handleStrategyTypeShow(row)"
				/>
			</template>
			<template #operation="{ row }">
				<el-button icon="View" size="small" type="success" @click="handleClick(row)" />
				<el-button icon="Edit" size="small" type="primary" @click="handleStrategyType('编辑类型', row)" />
				<el-popconfirm title="确定删除吗?" @confirm="handleStrategyType('删除类型', row)">
					<template #reference>
						<el-button icon="Delete" size="small" type="danger" />
					</template>
				</el-popconfirm>
			</template>
		</MyTable>

		<el-drawer z-index="99" v-model="isViewInfo" title="攻略分类详情" direction="rtl" size="50%">
			<MyDescription :data="drawerData" :items="items" :column="1" />
		</el-drawer>

		<el-dialog v-model="dialogFormVisible" :title="dialogTitle">
			<MyForm :formData="form" :items="items">
				<template #description>
					<el-input type="textarea" v-model="form.description" autocomplete="off" />
				</template>
			</MyForm>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel">取消</el-button>

					<el-button type="primary" @click="handleStrategyTypeSubmit(dialogTitle === '添加类型' ? 'add' : 'edit')">{{
						dialogTitle === "添加类型" ? "添加" : "保存"
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<div class="card" v-else>
		<el-empty description="无访问权限" />
	</div>
</template>

<script setup lang="ts" name="strategyCategory">
import MyTable from "@/components/MyTable/index.vue";
import MyForm from "@/components/MyForm/index.vue";
import MyDescription from "@/components/MyDescription/index.vue";
import {
	addStrategyType,
	getStrategyType,
	setStrategyTypeShow,
	editStrategyType,
	deleteStrategyCate
} from "@/api/modules/strategy";
import { GlobalStore } from "@/stores";
import { useState } from "./useState";
import { useHandler } from "@/hooks/useHandler";

const globalStore = GlobalStore();

const { items, columns, form, strategyTypeList } = useState();

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

const initData = async () => {
	auth.value = globalStore.userInfo.role === "superManager";
	if (auth.value) strategyTypeList.value = (await getStrategyType())?.data;
};

const handleStrategyTypeSubmit = async (operation: string) => {
	const api = operation === "add" ? addStrategyType : editStrategyType;
	const res = await api(form.value);
	showMessage(res);
	cancel();
	await initData();
};

const handleStrategyTypeShow = async (data: { name: string; isShow: boolean }) => {
	const res = await setStrategyTypeShow({ name: data.name, isShow: data.isShow });
	showMessage(res);
};

const handleStrategyType = async (operation: string, row = {}) => {
	await operationHandler(operation, row, deleteStrategyCate, form, initData);
};

initData();
</script>

<style scoped>
.btn {
	width: 160px;
	height: 40px;
}
</style>
