import http from "@/api";
import { PORT1 } from "../config/servicePort";

/**
 * @name 酒店信息
 */
export const addHotel = (params: Object) => http.post(PORT1 + "/hotel", params);
export const deleteHotel = (params: Object) => http.delete(PORT1 + "/hotel", params);
export const editHotelInfo = (params: Object) => http.put(PORT1 + "/hotel", params);
export const getHotelInfo = (params: Object) => http.get(PORT1 + "/hotel", params);

/**
 * @name 房间管理
 */

export const addRoom = (params: Object) => http.post(PORT1 + "/room", params);
export const deleteRoom = (params: Object) => http.delete(PORT1 + "/room", params);
export const editRoom = (params: Object) => http.put(PORT1 + "/room", params);
export const getRoom = (params: Object) => http.get(PORT1 + "/room", params);
