<template>
	<div class="card" v-if="auth">
		<div class="mt-4">
			<el-input v-model="search" placeholder="请输入用户名称" class="input-with-select" style="width: 500px">
				<template #prepend>
					<el-select v-model="searchRole" placeholder="角色权限" style="width: 130px">
						<el-option v-for="(role, i) in roles" :key="i" :label="role.label" :value="role.value" />
					</el-select>
				</template>
				<template #append>
					<el-button icon="Search" @click="searchUser" />
				</template>
			</el-input>
		</div>
		<el-divider />

		<MyTable :table-data="userList" :columns="columns">
			<template #avatar="{ row }">
				<el-image :src="row.avatar" fit="contain" />
			</template>
			<template #gender="{ row }">
				<div>{{ row.gender === 1 ? "男" : "女" }}</div>
			</template>
			<template #operation="{ row }">
				<el-row>
					<el-button icon="View" size="small" type="success" @click="handleClick(row)" />
					<el-button icon="Edit" size="small" type="primary" @click="handleUser('edit', row)" />
					<el-popconfirm title="确定删除该用户吗?" @confirm="handleUser('delete', row)">
						<template #reference>
							<el-button icon="Delete" size="small" type="danger" />
						</template>
					</el-popconfirm>
				</el-row>
			</template>
		</MyTable>

		<el-drawer z-index="99" :model-value="isViewInfo" title="用户信息" direction="rtl" size="50%">
			<MyDescription :data="drawerData" :items="items" :column="1">
				<template #avatar>
					<img :src="drawerData.avatar" width="100" height="100" alt="" />
				</template>
				<template #role>
					<div>{{ getRole(drawerData.role) }}</div>
				</template>
				<template #gender>
					<div>{{ drawerData.gender === 1 ? "男" : "女" }}</div>
				</template>
			</MyDescription>
		</el-drawer>

		<el-dialog v-model="dialogFormVisible" title="编辑用户权限">
			<MyForm :formData="form" :items="[{ label: '用户权限', prop: 'role', labelWidth: formLabelWidth }]">
				<template #role>
					<el-select v-model="form.role" placeholder="角色" style="width: 200px">
						<el-option label="景点管理员" value="sceneryManager" />
						<el-option label="酒店管理员" value="hotelManager" />
						<el-option label="普通用户" value="user" />
					</el-select>
				</template>
			</MyForm>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="editUserSubmit">保存</el-button>
				</span>
			</template>
		</el-dialog>
	</div>

	<div class="card" v-else>
		<el-empty description="无访问权限" />
	</div>
</template>

<script setup lang="ts" name="userManage">
import MyTable from "@/components/MyTable/index.vue";
import MyForm from "@/components/MyForm/index.vue";
import MyDescription from "@/components/MyDescription/index.vue";
import { GlobalStore } from "@/stores";
import { formLabelWidth } from "@/constant/index";
import { getUserList, editUser, deleteUser } from "@/api/modules/user";
import { useState } from "@/views/system/userManage/useState";
import { useHandler } from "@/hooks/useHandler";

const globalStore = GlobalStore();

const { roles, items, columns, search, searchRole, userList, form } = useState();

const { auth, dialogFormVisible, isViewInfo, drawerData, cancel, showMessage, handleClick } = useHandler();

const initData = async () => {
	auth.value = globalStore.userInfo.role === "superManager";
	if (auth.value) userList.value = (await getUserList({ role: "all", name: "" }))?.data;
};

const getRole = (role: string) =>
	role === "sceneryManager" ? "景点管理员" : role === "hotelManager" ? "酒店管理员" : "普通用户";

const searchUser = async () => {
	userList.value = (await getUserList({ role: searchRole.value, name: search.value }))?.data;
};

const editUserSubmit = async () => {
	const res = await editUser(form.value);

	showMessage(res);
	cancel();
};

const handleUser = async (type: string, data = {}) => {
	if (type === "edit") {
		form.value = { ...data }; //深拷贝
		dialogFormVisible.value = !dialogFormVisible.value;
		return;
	}
	const res = await deleteUser({ username: data.username });
	showMessage(res);
	await initData();
};

initData();
</script>

<style scoped></style>
