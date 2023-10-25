import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import DynamicRouter from "@/assets/json/dynamicRouter.json";
// import { GlobalStore } from '@/stores'
// const globalStore = GlobalStore()

import http from "@/api";

/**
 * @name 登录模块
 */
const signInApi = (params: Object) => {
	return http.post(PORT1 + `/user/signin`, params); // 正常 post json 请求  ==>  application/json
	// return http.get<Login.ResLogin>(`/api/login`) // 正常 post json 请求  ==>  application/json
};

// * 用户登录
const loginApi = (params: Object) => {
	return http.post(PORT1 + `/user/login`, params); // 正常 post json 请求  ==>  application/json
	// return http.get<Login.ResLogin>(`/api/login`) // 正常 post json 请求  ==>  application/json
};

// * 获取按钮权限
const getAuthButtonListApi = () => {
	return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`, {}, { headers: { noLoading: true } });
};

// * 获取菜单列表
const getAuthMenuListApi = (menuAuth: String) => {
	// return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`, {}, { headers: { noLoading: true } })
	// 如果想让菜单变为本地数据，注释上一行代码，并引入本地 dynamicRouter.json 数据
	return DynamicRouter;
};

// * 用户退出登录
const logoutApi = () => http.post(PORT1 + `/user/logout`);

export { loginApi, signInApi, getAuthButtonListApi, getAuthMenuListApi, logoutApi };
