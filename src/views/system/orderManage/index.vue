<template>
	<div class="card" v-if="auth">
		<div style="display: flex; align-items: center">
			<h3 style="margin: 10px">订单类型</h3>
			<el-select
				v-model="form.type"
				class="m-2"
				placeholder="请选择订单类型"
				size="large"
				@change="handleStrategyTypeSelect"
			>
				<el-option v-for="(item, index) in ['门票', '酒店']" :key="index" :label="item" :value="item" />
			</el-select>
		</div>
		<el-divider />

		<MyTable :table-data="strategyList" :columns="columns">
			<template #type="{ row }">
				<el-tag size="large">{{ row.type }}</el-tag>
			</template>
			<template #coverImg="{ row }">
				<el-image :src="row.coverImg" fit="contain" />
			</template>
			<template #operation="{ row }">
				<el-button icon="View" size="small" type="success" @click="handleClick(row)" />
				<el-button icon="Edit" size="small" type="primary" @click="handleOrder('edit', row)" />
				<el-button icon="Delete" size="small" type="danger" />
			</template>
		</MyTable>

		<!-- 详情抽屉 -->
		<el-drawer z-index="99" v-model="isViewInfo" title="订单详情" direction="rtl" size="50%">
			<el-form :model="drawerData"></el-form>
		</el-drawer>

		<!-- 编辑弹窗 -->
		<el-dialog v-model="dialogFormVisible" :title="dialogTitle">
			<el-form :model="form"></el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel">取消</el-button>
					<el-button v-if="dialogTitle === '添加订单'" type="primary" @click="addStrategySubmit">添加</el-button>
					<el-button v-else type="primary" @click="editStrategySubmit">保存</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<div class="card" v-else>
		<el-empty description="无访问权限" />
	</div>
</template>

<script setup lang="ts" name="orderManage">
import MyTable from "@/components/MyTable/index.vue";
// import MyForm from "@/components/MyForm/index.vue";
// import MyDescription from "@/components/MyDescription/index.vue";
import { getOrderList } from "@/api/modules/order";
import { GlobalStore } from "@/stores";
import { useState } from "./useState";
import { useHandler } from "@/hooks/useHandler";

const globalStore = GlobalStore();

const { auth, dialogTitle, isViewInfo, drawerData, dialogFormVisible, strategyList, columns, form } = useState();
const {
	handleClick,
	cancel
	// operationHandler
} = useHandler();
const initData = async () => {
	auth.value = globalStore.userInfo.role === "superManager";

	if (auth.value) {
		strategyList.value = (await getOrderList({}))?.data;
	}
};

const handleStrategyTypeSelect = async e => {
	strategyList.value = (await getOrderList({}))?.data;
};

const handleOrder = (type: string, data = {}) => {
	dialogTitle.value = type === "add" ? "添加订单" : "编辑订单";
	form.value = data;
	dialogFormVisible.value = !dialogFormVisible.value;
};

initData();
</script>
