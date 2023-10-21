<template>
	<el-dialog v-model="dialogVisible" title="修改用户名" width="500px" draggable>
		<el-form ref="form" :model="userInfo" label-width="auto" label-position="left" size="large" :rules="rules">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="userInfo.username" :disabled="!isEditing" />
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="edit">编辑</el-button>
				<el-button type="success" @click="save">保存</el-button>
			</el-form-item>
		</el-form>


	</el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { GlobalStore } from "@/stores";
import type { FormRules } from 'element-plus'
import { changeUsername } from '@/api/modules/user'
import { ElMessage } from 'element-plus'


const isEditing = ref(false)
const dialogVisible = ref(false);
const globalStore = GlobalStore()

const userInfo = ref({})
const originUsername = ref('')

const validatePass = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('用户名不能为空'))
	} else {
		callback()
	}
}

const rules = reactive<FormRules>({
	username: [{ validator: validatePass, trigger: 'blur' }],

})

const edit = () => {
	isEditing.value = true
}

const save = () => {
	changeUsername({ userInfo: userInfo.value, originUsername: originUsername.value }).then(res => {
		if (res.code === 200) {
			ElMessage({
				type: "success",
				message: `${res.msg}!`
			});
			dialogVisible.value = true
			isEditing.value = false
		}
	})
}

const initData = () => {
	userInfo.value = globalStore.userInfo
	console.log(userInfo.value)
	originUsername.value = userInfo.value.username
}

// openDialog
const openDialog = () => {
	dialogVisible.value = true;
};

defineExpose({ openDialog });


initData()
</script>

<style>
.el-radio-group {
	margin-right: 12px;
}
</style>