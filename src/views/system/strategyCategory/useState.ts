import { ref } from "vue";
import { formLabelWidth } from "@/constant";

export const useState = () => {
	const strategyTypeList: any = ref([]);

	const isViewInfo = ref(false);
	const drawerData = ref({});
	const auth = ref(true);
	const dialogTitle = ref("");
	const dialogFormVisible = ref(false);
	const form: any = ref({
		id: "",
		name: "",
		description: "",
		isShow: ""
	});
	const items = ref([
		{
			label: "类型名称",
			prop: "name"
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
			label: "攻略类型",
			prop: "name",
			width: "160"
		},
		{
			label: "描述信息",
			prop: "description",
			width: "200",
			"show-overflow-tooltip": true
		},
		{
			label: "是否展示",
			prop: "isShow",
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
		isViewInfo,
		dialogTitle,
		dialogFormVisible,
		strategyTypeList
	};
};
