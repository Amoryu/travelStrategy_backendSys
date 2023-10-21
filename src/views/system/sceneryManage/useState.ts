import { ref } from "vue";
import { formLabelWidth } from "@/constant";

export const useState = () => {
	const dialogTitle = ref("编辑景点");
	const isViewInfo = ref(false);
	const drawerData = ref({});
	const auth = ref(true);
	const dialogFormVisible = ref(false);
	const location = ref({
		province: "",
		city: "",
		area: ""
	});
	const form: any = ref({
		id: "",
		name: "",
		description: "",
		province: "",
		city: "",
		area: "",
		provinceName: "",
		cityName: "",
		areaName: "",
		image: "",
		isOpen: true,
		rank: 0,
		address: ""
	});
	const sceneList: any = ref([]);
	const items = ref([
		{
			label: "景点名称",
			prop: "name"
		},
		{
			label: "省市区",
			prop: "province"
		},
		{
			label: "详细地址",
			prop: "address"
		},
		{
			label: "封面图",
			prop: "image"
		},
		{
			label: "描述信息",
			prop: "description"
		}
	]);
	items.value = items.value.map(item => ({
		...item,
		labelWidth: formLabelWidth
	}));
	const columns = ref([
		{
			type: "index",
			label: "序号",
			width: "60",
			fixed: true
		},
		{
			label: "景点名称",
			prop: "name",
			width: "200",
			"show-overflow-tooltip": true
		},
		{
			label: "景点位置",
			prop: "address",
			width: "120",
			"show-overflow-tooltip": true
		},
		{
			label: "景点描述",
			prop: "description",
			width: "200",
			"show-overflow-tooltip": true
		},
		{
			label: "景点封面图",
			prop: "image",
			width: "150"
		},
		{
			label: "景点排名",
			prop: "rank",
			width: "100"
		},
		{
			label: "是否开放",
			prop: "isOpen",
			width: "100",
			fixed: "right"
		},
		{
			label: "操作",
			prop: "operation",
			width: "160",
			fixed: "right"
		}
	]);

	return {
		items,
		columns,
		drawerData,
		auth,
		form,
		location,
		isViewInfo,
		dialogTitle,
		dialogFormVisible,
		sceneList
	};
};
