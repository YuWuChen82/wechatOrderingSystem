import http from "@/http";
import { CategoryModel, ListCategoryParams } from "./CategoryModel";

export const addApi = (parm: CategoryModel) => {
    return http.post("/api/category", parm);
}

export const getListApi = (parm: ListCategoryParams) => {
    return http.get("/api/category/list", parm);
}

export const editApi = (parm: CategoryModel) => {
    return http.put("/api/category", parm);
}

export const deleteApi = (categoryId: String) => {
    return http.delete(`/api/category/${categoryId}`);
}
// 下拉列表
export const getSelectApi = () => {
    return http.get("/api/category/getSelectList");
}