import http from "@/api";
import { PORT1 } from "../config/servicePort";

/**
 * @name 攻略分类
 */
export const getStrategyType = () => http.get(PORT1 + "/strategy/type");

export const addStrategyType = (params: Object) => http.post(PORT1 + "/strategy/type", params);

export const setStrategyTypeShow = (params: Object) => http.post(PORT1 + "/strategyshow", params);

export const editStrategyType = (params: Object) => http.put(PORT1 + "/strategy/type", params);

export const deleteStrategyCate = (params: Object) => http.delete(PORT1 + "/strategy/type", params);

/**
 * @name 攻略管理
 */
// export export const getAllStrategy = () => {
// 	return http.get(PORT1 + '/strategylist')
// }

export const getStrategy = (params: Object) => http.get(PORT1 + "/strategy", params);

export const addStrategy = (params: Object) => http.post(PORT1 + "/strategy", params);

export const editStrategy = (params: Object) => http.put(PORT1 + "/strategy", params);

export const deleteStrategy = (params: Object) => http.delete(PORT1 + "/strategy", params);
