import { ref } from "vue";
import { formLabelWidth } from "@/constant";

export const useState = () => {
	const dialogTitle = ref("");
	const isViewInfo = ref(false);
	const drawerData = ref({});
	const dialogFormVisible = ref(false);
	const form: any = ref({
		id: "",
		title: "",
		content: "",
		coverImg: "",
		type: "",
		province: "",
		city: "",
		area: "",
		provinceName: "",
		cityName: "",
		areaName: "",
		duration: "",
		address: "",
		perCost: 0,
		mentionScenery: "",
		userName: ""
	});
	const strategyTypeList: any = ref([]);
	const strategyList: any = ref([]);
	const items = ref([
		{
			label: "攻略标题",
			prop: "title"
		},
		{
			label: "攻略内容",
			prop: "content"
		},
		{
			label: "攻略类型",
			prop: "type"
		},
		{
			label: "省市区",
			prop: "location"
		},
		{
			label: "详细地址",
			prop: "address"
		},
		{
			label: "封面图",
			prop: "coverImg"
		},
		{
			label: "游玩时长",
			prop: "duration"
		},
		{
			label: "人均成本",
			prop: "perCost"
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
			label: "攻略标题",
			prop: "title",
			width: "120",
			fixed: true,
			"show-overflow-tooltip": true
		},
		{
			label: "攻略类型",
			prop: "type",
			width: "100"
		},
		{
			label: "攻略内容",
			prop: "content",
			width: "160",
			"show-overflow-tooltip": true
		},
		{
			label: "攻略封面图",
			prop: "coverImg",
			width: "100"
		},
		{
			label: "所在地",
			prop: "address",
			width: "120"
		},
		{
			label: "游玩时长",
			prop: "duration",
			width: "100"
		},
		{
			label: "人均成本",
			prop: "perCost",
			width: "100"
		},
		{
			label: "发布时间",
			prop: "publishtime",
			width: "120"
		},
		{
			label: "相关景点",
			prop: "mentionScenery",
			width: "120"
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
		dialogTitle,
		isViewInfo,
		drawerData,
		dialogFormVisible,
		form,
		strategyTypeList,
		strategyList
	};
};
