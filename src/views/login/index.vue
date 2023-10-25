<template>
	<div class="login-container flx-center">
		<div class="login-box">
			<SwitchDark class="dark" />
			<div class="login-left">
				<img src="@/assets/images/login_left.png" alt="login" />
			</div>
			<div class="login-form">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/images/logo.svg" alt="" />
					<h2 class="logo-text">薛定猫后台管理</h2>
				</div>

				<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
					<el-tab-pane label="登录" name="login">
						<LoginForm />
					</el-tab-pane>
					<el-tab-pane label="注册" name="signIn">
						<SignInForm @signIn="handleSignIn" :isLogin="activeName === 'login'" />
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import SwitchDark from "@/components/SwitchDark/index.vue";
import LoginForm from "./components/LoginForm.vue";
import SignInForm from "./components/SignIn.vue";
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";

const activeName = ref("login");
const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab.props.name);
};
const handleSignIn = () => {
	activeName.value = "login";
	// console.log(data.userName);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
<style scoped lang="scss">
.demo-tabs {
	padding: 0 32px;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}
</style>
