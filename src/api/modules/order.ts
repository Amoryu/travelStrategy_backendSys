import http from "@/api";
import { PORT1 } from "../config/servicePort";

/**
 * @name 订单管理
 */

/**
 * @name 房间管理
 */
const getOrderList = (params: Object) => http.get(PORT1 + "/order", params);

const editOrder = (params: Object) => http.put(PORT1 + "/order", params);

export { getOrderList, editOrder };
