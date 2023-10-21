<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<SearchMenu id="searchMenu" />
			<Message id="message" />
			<ThemeSetting id="themeSetting" />
			<Fullscreen id="fullscreen" />
			<!-- <AssemblySize id="assemblySize" /> -->
			<!-- <Language id="language" /> -->
		</div>
		<span class="username">{{ UserInfo.name }}</span>
		<Avatar :avatar="UserInfo.avatar" />
	</div>
</template>
s

<script setup lang="ts">
import SearchMenu from './components/SearchMenu.vue'
import Message from './components/Message.vue'
import ThemeSetting from './components/ThemeSetting.vue'
import Avatar from './components/Avatar.vue'
import Fullscreen from './components/Fullscreen.vue'
import { ref } from 'vue'
// import AssemblySize from './components/AssemblySize.vue'
// import Language from './components/Language.vue'
import { GlobalStore } from '@/stores'
const globalStore = GlobalStore()

const UserInfo = ref({
	name: '',
	avatar: ''
})

const initData = () => {
	console.log(globalStore.userInfo)
	UserInfo.value.name = globalStore.userInfo.name
	UserInfo.value.avatar = globalStore.userInfo.avatar
}

initData()



// const userName = ref(globalStore.userInfo.name)


</script>

<style scoped lang="scss">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 30px 0 0;

	.header-icon {
		display: flex;
		align-items: center;

		&>* {
			margin-left: 21px;
		}
	}

	.username {
		margin: 0 20px;
		font-size: 15px;
	}
}
</style>
