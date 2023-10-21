import { ref } from "vue";
import { formLabelWidth } from "@/constant";

export const useState = () => {
	const items = ref([
		{
			label: "酒店名称",
			prop: "name"
		},
		{
			label: "描述信息",
			prop: "description"
		},
		{
			label: "酒店图片",
			prop: "pictureList"
		},
		{
			label: "入住时间",
			prop: "checkTime"
		},
		{
			label: "房间数量",
			prop: "roomNumber"
		},
		{
			label: "房间类型",
			prop: "roomType"
		},
		{
			label: "联系电话",
			prop: "phone"
		},
		{
			label: "酒店设施",
			prop: "facility"
		},
		{
			label: "省市区",
			prop: "province"
		}
	]);
	items.value = items.value.map(item => ({
		...item,
		labelWidth: formLabelWidth
	}));
	const columns: any = ref([
		{
			type: "index",
			label: "序号",
			width: "60",
			fixed: true
		},
		{
			label: "酒店名称",
			prop: "name",
			width: "160"
		},
		{
			label: "描述信息",
			prop: "description",
			width: "200",
			"show-overflow-tooltip": true
		},
		// {
		// 	label: "酒店图片",
		// 	prop: "pictureList",
		// 	width: "150"
		// },
		{
			label: "联系电话",
			prop: "phone",
			width: "160"
		},
		{
			label: "酒店设施",
			prop: "facility",
			width: "200",
			"show-overflow-tooltip": true
		},

		{
			label: "省市区",
			prop: "province",
			width: "100"
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
		name: "",
		description: "",
		address: "",
		province: "",
		city: "",
		area: "",
		provinceName: "",
		cityName: "",
		areaName: "",
		phone: "",
		facility: "",
		roomType: "单人间|双人间|商务套间|豪华套间",
		checkTime: "",
		leaveTime: "",
		roomNumber: 0,
		pictureList: []
	});
	const hotelList: any = ref([]);

	return {
		items,
		columns,
		form,
		hotelList
	};
};
