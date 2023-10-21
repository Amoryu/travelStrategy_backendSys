import { Upload } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 文件上传模块
 */
// * 图片上传
const uploadImg = (params: FormData) => http.post<Upload.ResFileUrl>(PORT1 + `/image`, params);

// * 视频上传
const uploadVideo = (params: FormData) => http.post<Upload.ResFileUrl>(PORT1 + `/file/upload/video`, params);

export { uploadImg, uploadVideo };
