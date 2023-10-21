import { ref } from "vue";

export const useState = () => {
	const search = ref("");
	const searchRole = ref("all");
	const auth = ref(true);
	const dialogFormVisible = ref(false);
	const isViewUserInfo = ref(false);
	const userList: any = ref([]);
	const drawerData = ref({});
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
		address: "",
		role: ""
	});
	const roles = ref([
		{
			label: "全部",
			value: "all"
		},
		{
			label: "景点管理员",
			value: "sceneryManager"
		},
		{
			label: "酒店管理员",
			value: "hotelManager"
		},
		{
			label: "普通用户",
			value: "user"
		}
	]);

	const items = ref([
		{
			label: "用户名称",
			prop: "name"
		},
		{
			label: "用户头像",
			prop: "avatar"
		},
		{
			label: "用户权限",
			prop: "role"
		},
		{
			label: "性别",
			prop: "gender"
		},
		{
			label: "所在地址",
			prop: "address"
		},
		{
			label: "个性签名",
			prop: "signature"
		}
	]);

	const columns = ref([
		{
			type: "index",
			label: "序号",
			width: "60",
			fixed: true
		},
		{
			label: "用户名称",
			prop: "name",
			width: "200"
		},
		{
			label: "用户头像",
			prop: "avatar",
			width: "100"
		},
		{
			label: "性别",
			prop: "gender",
			width: "60"
		},
		{
			label: "居住地",
			prop: "address",
			width: "100"
		},
		{
			label: "个性签名",
			prop: "signature",
			width: "200"
		},
		{
			label: "操作",
			prop: "operation",
			width: "160"
		}
	]);

	return {
		roles,
		items,
		columns,
		search,
		searchRole,
		auth,
		dialogFormVisible,
		isViewUserInfo,
		userList,
		drawerData,
		form
	};
};
