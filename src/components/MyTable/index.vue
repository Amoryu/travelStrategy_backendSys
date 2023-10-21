<template>
	<el-table
		:data="tableData"
		v-bind="attrs"
		stripe
		border
		height="50vh"
		:highlight-current-row="true"
		style="width: fit-content; margin-top: 10px"
		:header-cell-style="{ 'background-color': '#efefef' }"
	>
		<el-table-column v-for="(column, i) in columns" :key="i" v-bind="column">
			<template #default="scope" v-if="slots[column.prop]">
				<slot :name="column.prop" v-bind="scope || {}"></slot>
			</template>
		</el-table-column>
	</el-table>
	<div style="padding: 10px 10px 0">
		<el-pagination
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:page-sizes="[100, 200, 300, 400]"
			:disabled="disabled"
			background
			layout="total, sizes, prev, pager, next, jumper"
			:total="tableData.length"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>

<script setup lang="ts">
import { useAttrs, useSlots, ref } from "vue";

const props = defineProps({
	tableData: Object,
	columns: []
});

const attrs = useAttrs();
const slots = useSlots();
const currentPage = ref(1);
const pageSize = ref(10);

currentPage.value = props.tableData?.length % pageSize.value;

const disabled = ref(false);
const handleSizeChange = () => {};
const handleCurrentChange = () => {};
</script>

<style scoped></style>
