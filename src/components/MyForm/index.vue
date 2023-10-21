<template>
	<el-form :model="formData" v-bind="attrs">
		<el-form-item v-for="(item, i) in items" :key="i" v-bind="item">
			<template #default v-if="slots[item.prop]">
				<slot :name="item.prop"></slot>
			</template>
			<template #default v-else>
				<el-input v-model="formData[item.prop]" autocomplete="off" />
			</template>
		</el-form-item>
	</el-form>
</template>

<script setup>
import { useAttrs, useSlots } from "vue";

const attrs = useAttrs();
const slots = useSlots();
defineProps({
	formData: Object,
	items: []
});
</script>

<style scoped></style>
