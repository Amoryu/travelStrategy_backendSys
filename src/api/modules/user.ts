import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// * 获取用户列表
// const getUserList = (params: Object) => http.post(PORT1 + `/user/list`, params);
const getUserList = (params: Object) => http.get(PORT1 + `/user/search`, params);

//* 新增用户
const addUser = (params: { id: string }) => {
	// return http.post(PORT1 + `/user/add`, params)
};

// * 编辑用户
const editUser = (params: Object) => http.put(PORT1 + `/user/role`, params);

// * 删除用户
const deleteUser = (params: Object) => http.delete(PORT1 + `/user`, params);

// 修改密码
const changePassword = (params: Object) => http.put(PORT1 + `/user/password`, params);

// 修改用户名
const changeUsername = (params: Object) => http.put(PORT1 + `/user/username`, params);

export { getUserList, addUser, editUser, deleteUser, changePassword, changeUsername };
