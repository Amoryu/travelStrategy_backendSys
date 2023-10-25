<template>
	<el-form ref="registerFormRef" :model="registerForm" size="large">
		<el-form-item prop="username">
			<el-input v-model="registerForm.phone" placeholder="请输入手机号">
				<template #prefix>
					<el-icon class="el-input__icon">
						<user />
					</el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				type="password"
				v-model="registerForm.password"
				placeholder="请输入密码"
				show-password
				autocomplete="new-password"
			>
				<template #prefix>
					<el-icon class="el-input__icon">
						<lock />
					</el-icon>
				</template>
			</el-input>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button :icon="CircleClose" round @click="resetForm(registerFormRef)" size="large">重置</el-button>
		<el-button :icon="CircleClose" round @click="SignIn(registerFormRef)" type="primary" size="large">注册</el-button>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";

import { ElNotification } from "element-plus";
import { signInApi } from "@/api/modules/login";

import { getTimeState } from "@/utils/util";

import { CircleClose } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import md5 from "js-md5";
import { GlobalStore } from "@/stores";

const globalStore = GlobalStore();

// 定义 formRef（校验规则）

const props = withDefaults(
	defineProps<{
		isLogin: boolean; //选择框中间间隙
	}>(),
	{
		isLogin: false
	}
);

const emits = defineEmits(["signIn"]);
// const registerRules = reactive({
// 	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
// 	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
// });

const registerFormRef = ref();
const registerForm = ref({
	phone: "",
	password: ""
});

const loading = ref(false);

// resetForm
const resetForm = (formEl: any) => {
	if (!formEl) return;
	formEl.resetFields();
};

const SignIn = async (formEl: any) => {
	if (!formEl) return;
	loading.value = true;
	try {
		// 1.执行登录接口
		const { data }: { data: any } = await signInApi({
			userName: registerForm.value.phone,
			password: registerForm.value.password,
			token: md5(registerForm.value.phone),
			role: "user"
		});
		globalStore.setSignInName(data.userName);
		emits("signIn", data);
		ElNotification({
			title: getTimeState(),
			message: "注册成功",
			type: "success",
			duration: 3000
		});
	} finally {
		loading.value = false;
	}
};

watchEffect(() => {
	if (props.isLogin) {
		resetForm(registerFormRef.value);
	}
});

onMounted(() => {
	resetForm(registerFormRef.value);
});
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
