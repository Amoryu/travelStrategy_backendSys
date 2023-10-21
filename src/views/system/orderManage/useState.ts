import { ref } from "vue";

export const useState = () => {
	const auth = ref(true);
	const dialogTitle = ref("");
	const isViewInfo = ref(false);
	const drawerData = ref({});
	const dialogFormVisible = ref(false);
	const strategyList: any = ref([]);
	const columns = ref([
		{
			type: "index",
			label: "序号",
			width: "60",
			fixed: true
		},
		{
			label: "订单编号",
			prop: "orderNo",
			width: "300",
			fixed: true
		},
		{
			label: "订单类型",
			prop: "type",
			width: "100"
		},
		{
			label: "金额",
			prop: "amount",
			width: "100"
		},
		{
			label: "订单状态",
			prop: "state",
			width: "100"
		},
		{
			label: "创建时间",
			prop: "createTime",
			width: "200"
		},
		{
			label: "订单商家",
			prop: "amount",
			width: "180"
		},
		{
			label: "商品图片",
			prop: "coverImg",
			width: "150"
		},

		{
			label: "操作",
			prop: "operation",
			width: "160",
			fixed: "right"
		}
	]);
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
		mentionScenery: ""
	});
	return {
		auth,
		dialogTitle,
		isViewInfo,
		drawerData,
		dialogFormVisible,
		strategyList,
		columns,
		form
	};
};
