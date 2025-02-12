import http from "@/http";
import { ListUserParm, UserModel } from '@/api/user/UserModel'
export const addUserApi = (parm: UserModel) => {
    return http.post("/api/user", parm);
}

export const getListApi = (parm: ListUserParm) => {
    return http.get("/api/user/list", parm);
}

export const editUserApi = (parm: UserModel) => {
    return http.put("/api/user", parm);
}

export const deleteUserApi = (userId: string) => {
    return http.delete(`/api/user/${userId}`);
}