<template>
	<el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
		<el-form ref="ruleFormRef" :model="passwordForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
			<el-form-item label="原密码" prop="originPwd">
				<el-input v-model="passwordForm.originPwd" type="password" autocomplete="off" />
			</el-form-item>
			<el-form-item label="新密码" prop="newPwd">
				<el-input v-model="passwordForm.newPwd" type="password" autocomplete="off" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm(passwordForm)">提交</el-button>
				<el-button @click="dialogVisible = false">取消</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { GlobalStore } from '@/stores'
import { changePassword } from '@/api/modules/user'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

interface PWD {
	originPwd: string
	newPwd: string
}

const passwordForm: PWD = reactive({
	originPwd: '',
	newPwd: ''
})

const validatePass = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请输入旧密码'))
	} else {
		if (passwordForm.originPwd !== '') {
			if (!ruleFormRef.value) return
			ruleFormRef.value.validateField('originPwd', () => null)
		}
		callback()
	}
}
const validatePass2 = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请输入新的密码'))
	} else if (value === passwordForm.originPwd) {
		callback(new Error("新密码不能和旧密码相同"))
	} else {
		callback()
	}
}

const rules = reactive<FormRules>({
	originPwd: [{ validator: validatePass, trigger: 'blur' }],
	newPwd: [{ validator: validatePass2, trigger: 'blur' }],
})

const globalStore = GlobalStore()
const dialogVisible = ref(false)
const userInfo = ref({})

const initData = () => {
	userInfo.value = globalStore.userInfo
}


// openDialog
const openDialog = () => {
	dialogVisible.value = true
}

const submitForm = (passwordForm: PWD) => {
	if (!passwordForm) return
	console.log(passwordForm.originPwd)
	console.log(passwordForm.newPwd)
	changePassword({ userInfo: userInfo.value, passwordForm }).then(res => {
		console.log(res)
		if (res.code === 200) {
			ElMessage({
				type: "success",
				message: `${res.msg}!`
			});
			dialogVisible.value = true

		}
	})
}


defineExpose({ openDialog })


initData()
</script>
