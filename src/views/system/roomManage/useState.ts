import { ref } from "vue";
import { formLabelWidth } from "@/constant";

export const useState = () => {
	const dialogTitle = ref("");
	const dialogFormVisible = ref(false);
	const auth = ref(true);
	const roomList: any = ref([]);
	const roomType = ref([]);
	const isViewInfo = ref(false);
	const drawerData = ref({});
	const userInfo = ref({});
	const hotelList: any = ref([]);
	const items = ref([
		{
			label: "房间名称",
			prop: "name"
		},
		{
			label: "房间号",
			prop: "roomNo"
		},
		{
			label: "具体信息",
			prop: "description"
		},
		{
			label: "价格",
			prop: "price"
		},
		{
			label: "房间类型",
			prop: "roomType"
		},
		{
			label: "封面图",
			prop: "coverImg"
		}
	]);
	const form: any = ref({
		id: "",
		name: "",
		description: "",
		price: 0,
		coverImg: "",
		roomType: "",
		isSpare: true,
		checkTime: "",
		leaveTime: "",
		hotelName: "",
		roomNo: ""
	});
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
			label: "房间名称",
			prop: "name",
			width: "160",
			"show-overflow-tooltip": true
		},
		{
			label: "房间号",
			prop: "roomNo",
			width: "100"
		},
		{
			label: "类型",
			prop: "roomType",
			width: "120"
		},
		{
			label: "房间封面图",
			prop: "coverImg",
			width: "120"
		},
		{
			label: "价格",
			prop: "price",
			width: "100"
		},
		{
			label: "入住时间",
			prop: "checkTime",
			width: "120",
			"show-overflow-tooltip": true
		},
		{
			label: "离店时间",
			prop: "leaveTime",
			width: "120",
			"show-overflow-tooltip": true
		},
		{
			label: "描述信息",
			prop: "description",
			width: "120"
		},
		{
			label: "酒店名称",
			prop: "hotelName",
			width: "120"
		},
		{
			label: "是否空余",
			prop: "isSpare",
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
		dialogTitle,
		dialogFormVisible,
		auth,
		form,
		roomList,
		roomType,
		isViewInfo,
		drawerData,
		userInfo,
		hotelList,
		items,
		columns
	};
};
