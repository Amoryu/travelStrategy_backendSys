<template>
	<el-descriptions v-bind="attrs" border>
		<el-descriptions-item v-for="(item, i) in items" :key="i" :label="item.label" label-class-name="my-label">
			<template #default v-if="slots[item.prop]">
				<slot :name="item.prop"></slot>
			</template>
			<template #default v-else>
				{{ data[item.prop] }}
			</template>
		</el-descriptions-item>
	</el-descriptions>
</template>

<script setup>
import { useAttrs, useSlots } from "vue";

const attrs = useAttrs();
const slots = useSlots();
defineProps({
	data: Object,
	items: []
});
</script>

<style scoped>
:deep(.my-label) {
	width: 100px;
}
</style>
