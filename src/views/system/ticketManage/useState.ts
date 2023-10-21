import { ref } from "vue";
import { formLabelWidth } from "@/constant";

export const useState = () => {
	const auth = ref(true);
	const dialogTitle = ref("");
	const dialogFormVisible = ref(false);
	const tickets: any = ref([]);
	const isViewInfo = ref(false);
	const drawerData = ref({});
	const sceneName = ref("");
	const form: any = ref({
		id: "",
		name: "",
		type: "",
		price: 0,
		onSale: false,
		description: "",
		sceneName: "",
		sold: 0
	});
	const sceneList: any = ref([]);
	const ticketTypes = ref([
		{ type: "成人票", value: "adult" },
		{ type: "学生票", value: "student" },
		{ type: "儿童票", value: "child" }
	]);
	const items = ref([
		{
			label: "所属景点",
			prop: "sceneName"
		},
		{
			label: "门票名称",
			prop: "name"
		},
		{
			label: "所属景点",
			prop: "sceneName"
		},
		{
			label: "门票类型",
			prop: "type"
		},
		{
			label: "价格",
			prop: "price"
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
			label: "门票名称",
			prop: "name",
			width: "200"
		},
		{
			label: "所属景点",
			prop: "sceneName",
			width: "200",
			"show-overflow-tooltip": true
		},
		{
			label: "类型",
			prop: "type",
			width: "100"
		},
		{
			label: "价格",
			prop: "price",
			width: "100"
		},
		{
			label: "已售数量",
			prop: "sold",
			width: "100"
		},
		{
			label: "是否上架",
			prop: "onSale",
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
		auth,
		dialogTitle,
		dialogFormVisible,
		tickets,
		isViewInfo,
		drawerData,
		form,
		sceneName,
		sceneList,
		ticketTypes,
		items,
		columns
	};
};
