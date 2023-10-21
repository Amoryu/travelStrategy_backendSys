<template>
	<div class="card" v-if="auth">
		<div style="display: flex; align-items: center">
			<h3 style="margin: 10px">所属酒店</h3>
			<el-select v-model="form.hotelName" class="m-2" placeholder="请选择酒店" size="large" @change="handleHotelSelect">
				<el-option v-for="(item, index) in hotelList" :key="index" :label="item.name" :value="item.name" />
			</el-select>
			<el-button class="btn" type="primary" @click="handleRoom('添加房间')">
				<el-icon>
					<Plus />
				</el-icon>
				添加房间
			</el-button>
		</div>
		<el-divider />

		<MyTable :table-data="roomList" :columns="columns">
			<template #roomType="{ row }">
				<el-tag>{{ row.roomType }}</el-tag>
			</template>
			<template #coverImg="{ row }">
				<el-image :src="row.coverImg" fit="contain" />
			</template>
			<template #checkTime="{ row }"> 当日{{ row.checkTime }}后</template>
			<template #leaveTime="{ row }"> 次日{{ row.leaveTime }}前</template>
			<template #isSpare="{ row }">
				<el-tag v-if="row.isSpare" class="ml-2">空余</el-tag>
				<el-tag v-else class="ml-2" type="success">消费中</el-tag>
			</template>
			<template #operation="{ row }">
				<el-row>
					<el-button icon="View" size="small" type="success" @click="handleClick(row)" />
					<el-button icon="Edit" size="small" type="primary" @click="handleRoom('编辑房间', row)" />
					<el-popconfirm title="确定删除吗?" @confirm="handleRoom('删除房间', row)">
						<template #reference>
							<el-button icon="Delete" size="small" type="danger" />
						</template>
					</el-popconfirm>
				</el-row>
			</template>
		</MyTable>

		<el-drawer z-index="99" v-model="isViewInfo" title="房间详情" direction="rtl" size="50%">
			<MyDescription :data="drawerData" :items="items" :column="1">
				<template #price>
					<div class="mt-4">
						<el-input v-model="drawerData.price" placeholder="设置价格" type="number" readonly>
							<template #append>元</template>
						</el-input>
					</div>
				</template>
				<template #roomType>
					<el-tag size="large">{{ drawerData.roomType }}</el-tag>
				</template>
				<template #coverImg>
					<UploadImg :image-url="drawerData.coverImg" :disabled="true" />
				</template>
			</MyDescription>
		</el-drawer>

		<el-dialog v-model="dialogFormVisible" :title="dialogTitle">
			<MyForm :formData="form" :items="items">
				<template #description>
					<el-input :rows="5" type="textarea" v-model="form.description" autocomplete="off" />
				</template>
				<template #price>
					<div class="mt-4">
						<el-input v-model="form.price" placeholder="设置价格" type="number">
							<template #append>元</template>
						</el-input>
					</div>
				</template>
				<template #roomType>
					<el-select v-model="form.roomType" class="m-2" placeholder="请选择房型" size="large">
						<el-option v-for="(item, index) in roomType" :key="index" :label="item" :value="item" />
					</el-select>
				</template>
				<template #coverImg>
					<UploadImg v-model:image-url="form.coverImg" />
				</template>
			</MyForm>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel">取消</el-button>
					<el-button type="primary" @click="handleRoomSubmit(dialogTitle === '添加房间' ? 'add' : 'edit')">{{
						dialogTitle === "添加房间" ? "添加" : "保存"
					}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<div class="card" v-else>
		<el-empty description="无访问权限" />
	</div>
</template>

<script setup lang="ts" name="hotelManage">
import MyTable from "@/components/MyTable/index.vue";
import MyForm from "@/components/MyForm/index.vue";
import MyDescription from "@/components/MyDescription/index.vue";
import UploadImg from "@/components/Upload/Img.vue";
import { getHotelInfo, addRoom, getRoom, editRoom, deleteRoom } from "@/api/modules/hotel";
import { GlobalStore } from "@/stores";
import { useState } from "./useState";
import { useHandler } from "@/hooks/useHandler";

const globalStore = GlobalStore();

const { form, roomList, roomType, userInfo, hotelList, items, columns } = useState();

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
	const { userInfo: user } = globalStore;
	userInfo.value = user;

	auth.value = ["hotelManager", "superManager"].includes(user.role);

	if (auth.value) {
		const res = await getHotelInfo({ manager: user.username });
		hotelList.value = res.data as Array<Object>;
		const { name: hotelName, checkTime, leaveTime, roomType: type } = res.data[0];
		form.value.hotelName = hotelName;
		form.value.checkTime = checkTime;
		form.value.leaveTime = leaveTime;
		form.value.isSpare = true;
		roomType.value = type.split("|");
		roomList.value = (await getRoom({ hotelName }))?.data;
	}
};

const handleHotelSelect = () => {};

const handleRoom = async (operation: string, row = {}) => {
	await operationHandler(operation, row, deleteRoom, form, initData);
};

const handleRoomSubmit = async (operation: string) => {
	const api = operation === "add" ? addRoom : editRoom;
	const params = operation === "add" ? { hotelName: hotelList.value[0].name, roomInfo: form.value } : form.value;
	const res = await api(params);
	showMessage(res);

	cancel();
	roomList.value = (await getRoom({ hotelName: hotelList.value[0].name }))?.data;
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
