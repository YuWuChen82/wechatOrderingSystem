import http from "@/http";
import { CommentListParams } from "./CommentModel"

//列表
export const getListApi = (parm: CommentListParams) => {
    return http.get("/wxapi/comment/pcCommentList", parm);
}

//删除评论
export const deleteApi = (commentId: number) => {
    return http.delete(`/wxapi/comment/${commentId}`);
}


