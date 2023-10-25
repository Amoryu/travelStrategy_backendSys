<template>
	<div class="areabox">
		<el-select
			:model-value="props.province"
			placeholder="请选择省"
			:style="style"
			@change="e => handleSelect('Province', e)"
		>
			<el-option v-for="(item, i) in regionData" :key="i" :label="item.label" :value="item.value" />
		</el-select>
		<el-select
			:model-value="props.city"
			placeholder="请选择市"
			:disabled="!props.province || cityList.length == 0"
			:style="style"
			@change="e => handleSelect('City', e)"
		>
			<el-option v-for="(item, i) in cityList" :key="i" :label="item.label" :value="item.value" />
		</el-select>
		<el-select
			:model-value="props.area"
			placeholder="请选择区"
			:style="style"
			:disabled="!props.province || !props.city || areaList.length == 0"
			@change="e => handleSelect('Area', e)"
		>
			<el-option v-for="(item, i) in areaList" :key="i" :label="item.label" :value="item.value" />
		</el-select>
	</div>
</template>
<script lang="ts" setup>
import { computed, ComputedRef } from "vue";
import { regionData } from "element-china-area-data";
import * as events from "events";

interface AreaList {
	value: string;
	label: string;
	children?: AreaList[];
}

const emit = defineEmits(["getProvince", "getCity", "getArea"]);
const props = withDefaults(
	defineProps<{
		gap: string | number; //选择框中间间隙
		width: string | number; //选择框宽度
		province: string;
		city: string;
		area: string;
	}>(),
	{
		gap: "8",
		width: "10",
		province: "",
		city: "",
		area: ""
	}
);

//切换省市区函数
const handleSelect = (type: "Province" | "City" | "Area", e: events) => {
	emit(`get${type}`, e);
};

const style = computed(() => ({ width: `${props.width}px`, marginRight: `${props.gap}px` }));
//二级城市列表
const cityList: ComputedRef<AreaList[]> = computed((): AreaList[] => {
	const temp = regionData.find((item: any) => item.value == props.province);
	return temp && temp.children ? temp.children : [];
});

//三级地区列表
const areaList: ComputedRef<AreaList[]> = computed((): AreaList[] => {
	if (!props.city || cityList.value.length == 0) {
		return [];
	}
	const temp = cityList.value.find((item: any) => item.value == props.city);
	return temp && temp.children ? temp.children : [];
});
</script>
<style scoped>
.areabox {
	display: flex;
	align-items: center;
}
</style>
