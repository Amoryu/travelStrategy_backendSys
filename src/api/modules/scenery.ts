import http from "@/api";
import { PORT1 } from "../config/servicePort";

/**
 * @name 景点管理模块
 */
export const addScenery = (params: Object) => http.post(PORT1 + "/scenery", params);
export const deleteScenery = (params: Object) => http.delete(PORT1 + "/scenery", params);
export const editScenery = (params: Object) => http.put(PORT1 + "/scenery", params);
export const getScenery = (params: Object) => http.get(PORT1 + "/scenery", params);
export const getAllScenery = () => http.get(PORT1 + "/scenery/all");
export const setSceneryOpen = (params: Object) => http.put(PORT1 + "/scenery/open", params);
/**
 * @name 门票管理模块
 */

export const addTicket = (params: Object) => http.post(PORT1 + "/ticket", params);
export const deleteTicket = (params: Object) => http.delete(PORT1 + "/ticket", params);
export const editTicket = (params: Object) => http.put(PORT1 + "/ticket", params);
export const getTickets = (params: Object) => http.get(PORT1 + "/ticket", params);

export const setTicketOnSale = (params: Object) => http.post(PORT1 + "/ticketonsale", params);
