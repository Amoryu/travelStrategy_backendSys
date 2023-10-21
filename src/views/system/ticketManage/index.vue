<template>
	<div class="card">
		<div style="display: flex; align-items: center">
			<h3 style="margin: 10px">所属景点</h3>
			<el-select v-model="sceneName" class="m-2" placeholder="请选择景点" size="large" @change="handleSceneSelect">
				<el-option v-for="(item, index) in sceneList" :key="index" :label="item.name" :value="item.name" />
			</el-select>
			<el-button class="btn" type="primary" plain @click="initData">全部景点</el-button>
			<el-button class="btn" type="primary" @click="handleTicket('添加门票')">
				<el-icon>
					<Plus />
				</el-icon>
				添加门票
			</el-button>
		</div>
		<el-divider />

		<MyTable :table-data="tickets" :columns="columns">
			<template #type="{ row }">
				<el-tag size="large">{{ row.type }}</el-tag>
			</template>
			<template #onSale="{ row }">
				<el-switch
					v-model="row.onSale"
					class="ml-2"
					width="60"
					inline-prompt
					active-text="上架"
					inactive-text="下架"
					@change="handleTicketOnSale(row)"
				/>
			</template>
			<template #operation="{ row }">
				<el-button icon="View" size="small" type="success" @click="handleClick(row)" />
				<el-button icon="Edit" size="small" type="primary" @click="handleTicket('编辑门票', row)" />
				<el-popconfirm title="确定删除吗?" @confirm="handleTicket('删除门票', row)">
					<template #reference>
						<el-button icon="Delete" size="small" type="danger" />
					</template>
				</el-popconfirm>
			</template>
		</MyTable>

		<el-drawer z-index="99" v-model="isViewInfo" title="攻略详情" direction="rtl" size="50%">
			<MyDescription :data="drawerData" :items="items" :column="1">
				<template #type>
					<el-tag size="large">{{ drawerData.type }}</el-tag>
				</template>
				<template #price>
					<div class="mt-4">
						<el-input v-model="drawerData.price" placeholder="设置价格" type="number" readonly>
							<template #append>元</template>
						</el-input>
					</div>
				</template>
			</MyDescription>
		</el-drawer>

		<el-dialog v-model="dialogFormVisible" :title="dialogTitle">
			<MyForm :formData="form" :items="items">
				<template #sceneName>
					<el-select
						v-model="form.sceneName"
						class="m-2"
						placeholder="请选择景点"
						size="large"
						@change="handleSceneSelect"
					>
						<el-option v-for="item in sceneList" :key="item.id" :label="item.name" :value="item.name" />
					</el-select>
				</template>
				<template #type>
					<el-select v-model="form.type">
						<el-option v-for="(item, i) in ticketTypes" :key="i" :label="item.type" :value="item.type" />
					</el-select>
				</template>
				<template #price>
					<div class="mt-4">
						<el-input v-model="form.price" placeholder="设置价格" type="number">
							<template #append>元</template>
						</el-input>
					</div>
				</template>
				<template #description>
					<el-input type="textarea" v-model="form.description" autocomplete="off" />
				</template>
			</MyForm>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel">取消</el-button>
					<el-button type="primary" @click="handleTicketSubmit(dialogTitle === '添加门票' ? 'add' : 'edit')">{{
						dialogTitle === "添加门票" ? "添加" : "保存"
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="ticketManage">
import MyTable from "@/components/MyTable/index.vue";
import MyForm from "@/components/MyForm/index.vue";
import MyDescription from "@/components/MyDescription/index.vue";
import { getAllScenery, getTickets, addTicket, editTicket, setTicketOnSale, deleteTicket } from "@/api/modules/scenery";
import { GlobalStore } from "@/stores";
// import UploadImg from "@/components/Upload/Img.vue";
import { useState } from "./useState";
import { useHandler } from "@/hooks/useHandler";

const globalStore = GlobalStore();

const { tickets, form, sceneList, ticketTypes, items, columns, sceneName } = useState();

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
	sceneName.value = "";
	if (globalStore.userInfo.role === "sceneryManager" || globalStore.userInfo.role === "superManager") {
		sceneList.value = (await getAllScenery())?.data;
		tickets.value = (await getTickets({ sceneName: "" }))?.data;
	} else {
		auth.value = false;
	}
};

const handleSceneSelect = async e => {
	if (dialogTitle.value !== "编辑门票") {
		tickets.value = (await getTickets({ sceneName: e }))?.data;
	}
};

const handleTicketSubmit = async (operation: string) => {
	const api = operation === "add" ? addTicket : editTicket;
	const res = await api(form.value);
	showMessage(res);

	dialogFormVisible.value = !dialogFormVisible.value;
	tickets.value = (await getTickets({ sceneName: form.value.sceneName }))?.data;
};

const handleTicketOnSale = async ({ name, area, onSale }) => {
	const res = await setTicketOnSale({ name, area, onSale });
	showMessage(res);
};

const handleTicket = async (operation: string, row = {}) => {
	await operationHandler(operation, row, deleteTicket, form, initData);
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
