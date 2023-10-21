<template>
	<div class="card" v-if="auth">
		<el-button class="btn" type="primary" @click="handleHotel('添加酒店')">
			<el-icon>
				<Plus />
			</el-icon>
			添加酒店
		</el-button>

		<MyTable :table-data="hotelList" :columns="columns">
			<template #operation="{ row }">
				<el-button icon="View" size="small" type="success" @click="handleClick(row)" />
				<el-button icon="Edit" size="small" type="primary" @click="handleHotel('编辑酒店', row)" />
				<el-popconfirm title="确定删除吗?" @confirm="handleHotel('删除酒店', row)">
					<template #reference>
						<el-button icon="Delete" size="small" type="danger" />
					</template>
				</el-popconfirm>
			</template>
		</MyTable>

		<el-drawer z-index="99" v-model="isViewInfo" title="攻略分类详情" direction="rtl" size="70%">
			<MyDescription :data="drawerData" :items="items" :column="1">
				<template #pictureList>
					<UploadImgs :file-list="drawerData.pictureList" disabled />
				</template>
				<template #province>
					<div>
						{{ `${CodeToText[drawerData.province]} / ${CodeToText[drawerData.city]} / ${CodeToText[drawerData.area]}` }}
					</div>
				</template>
			</MyDescription>
		</el-drawer>

		<el-dialog v-model="dialogFormVisible" :title="dialogTitle">
			<MyForm :formData="form" :items="items">
				<template #description>
					<el-input type="textarea" v-model="form.description" autocomplete="off" />
				</template>
				<template #pictureList>
					<UploadImgs v-model:file-list="form.pictureList" />
				</template>
				<template #checkTime>
					当日:
					<el-time-select v-model="form.checkTime" placeholder="入住时间" start="00:00" step="00:15" end="23:45" />
					次日:
					<el-time-select v-model="form.leaveTime" placeholder="离店时间" start="00:00" step="00:15" end="23:45" />
				</template>

				<template #roomType>
					<!--					<el-tag-->
					<!--						v-for="tag in form.roomType.split('|')"-->
					<!--						:key="tag"-->
					<!--						class="mx-1"-->
					<!--						closable-->
					<!--						:disable-transitions="false"-->
					<!--						style="margin: 0 4px"-->
					<!--					>-->
					<!--						{{ tag }}-->
					<!--					</el-tag>-->
				</template>

				<template #province>
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
				<template #facility>
					<el-input type="textarea" v-model="form.facility" autocomplete="off" />
				</template>
			</MyForm>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel">取消</el-button>
					<el-button type="primary" @click="handleHotelSubmit(dialogTitle === '添加酒店' ? 'add' : 'edit')">{{
						dialogTitle === "添加酒店" ? "添加" : "保存"
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
import { CodeToText } from "element-china-area-data";

import { getHotelInfo, editHotelInfo, addHotel, deleteHotel } from "@/api/modules/hotel";
import { GlobalStore } from "@/stores";
import { useState } from "./useState";
import { useHandler } from "@/hooks/useHandler";
import MyRegionSelect from "@/components/MyRegionSelect/index.vue";
import UploadImgs from "@/components/Upload/Imgs.vue";

const globalStore = GlobalStore();

const { items, columns, form, hotelList } = useState();
const {
	auth,
	dialogTitle,
	dialogFormVisible,
	isViewInfo,
	drawerData,
	showMessage,
	handleClick,
	cancel
	// operationHandler
} = useHandler();

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
const initData = async () => {
	auth.value = globalStore.userInfo.role === "superManager";
	if (auth.value) {
		hotelList.value = (await getHotelInfo({}))?.data;
		hotelList.value.forEach(item => {
			item.pictureList = formatPictureList(item.pictureList, false);
		});
	}
};

const formatPictureList = (pictureList: any, stringify: boolean) =>
	stringify ? pictureList.map(item => item.url).join("|") : pictureList.split("|").map(item => ({ url: item }));

const handleHotelSubmit = async (operation: string) => {
	form.value.pictureList = operation === "add" ? [] : formatPictureList(form.value.pictureList, true);
	const api = operation === "add" ? addHotel : editHotelInfo;
	const params = operation === "add" ? { hotel: form.value, manager: "" } : form.value;
	const res = await api(params);
	showMessage(res);
	cancel();
	form.value.pictureList = operation === "add" ? [] : formatPictureList(form.value.pictureList, false);
	await initData();
};

const handleHotel = async (operation: string, row = {}) => {
	if (operation.includes("删除")) {
		const res = await deleteHotel({ id: row.id });
		showMessage(res);
		await initData();
	} else {
		dialogTitle.value = operation;
		form.value = { ...row };
		dialogFormVisible.value = !dialogFormVisible.value;
	}
};

initData();
</script>

<style scoped>
.btn {
	width: 100px;
	height: 40px;
}
</style>
