import { ref } from "vue";
import { ElMessage } from "element-plus";

export const useHandler = () => {
	const auth = ref(true);
	const dialogTitle = ref("");
	const dialogFormVisible = ref(false);
	const isViewInfo = ref(false);
	const drawerData = ref({});

	const handleClick = (data: Object) => {
		drawerData.value = data;
		isViewInfo.value = !isViewInfo.value;
	};
	const cancel = () => {
		dialogFormVisible.value = !dialogFormVisible.value;
		dialogTitle.value = "";
	};
	/**
	 * 根据返回值显示成功或失败提示语
	 * @param res 网络请求的返回值
	 */
	const showMessage = (res: any) => {
		ElMessage({
			type: res.code === 200 ? "success" : "warning",
			message: `${res.msg}!`
		});
	};

	/***
	 * 表格操作按钮的执行逻辑
	 * @param operation 操作的名称
	 * @param row 操作的行数据记录
	 * @param delApi 删除的接口
	 * @param form 整条记录的数据
	 * @param initFnc 初始化数据的接口
	 */
	const operationHandler = async (operation: string, row: any, delApi: any, form: any, initFnc: any) => {
		if (operation.includes("删除")) {
			const res: { code: number; msg: string } = await delApi({ id: row.id });
			showMessage(res);
			await initFnc();
		} else {
			dialogTitle.value = operation;
			form.value = { ...row };
			dialogFormVisible.value = !dialogFormVisible.value;
		}
	};

	return {
		auth,
		isViewInfo,
		dialogTitle,
		dialogFormVisible,
		drawerData,
		showMessage,
		handleClick,
		cancel,
		operationHandler
	};
};
