import http from "@/http";
import { BannerModel, ListBannerParams } from "./BannerModel";

export const addApi = (parm: BannerModel) => {
    return http.post("/api/banner", parm);
}

export const getListApi = (parm: ListBannerParams) => {
    return http.get("/api/banner/list", parm);
}

export const editApi = (parm: BannerModel) => {
    return http.put("/api/banner", parm);
}

export const deleteApi = (banId: String) => {
    return http.delete(`/api/banner/${banId}`);
}
