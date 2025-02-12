import http from '../common/http.js'
//下单
export const splaceOrderApi = (parm)=>{
	return http.post("/wxapi/order/splaceOrder",parm)
}
// 获取订单列表
export const getOrderListApi = (parm)=>{
	return http.get("/wxapi/order/getOrderList",parm)
}

// 取消订单
export const cancelOrderApi = (parm)=>{
	return http.post("/wxapi/order/cancelOrder",parm)
}

// 确定收货
export const confirmOrderApi = (parm)=>{
	return http.post("/wxapi/order/confirmOrder",parm)
}

// 获取评论列表
export const getCommentListApi = (parm)=>{
	return http.get("/wxapi/comment/commentList",parm)
}

//收藏商品
export const addCollectApi = (parm)=>{
	return http.post("/wxapi/collect/addCollect",parm)
}

//查询是否收藏该商品
export const hasCollectApi = (parm)=>{
	return http.get("/wxapi/collect/hasCollect",parm)
}

//取消收藏
export const cancelCollectApi = (parm)=>{
	return http.post("/wxapi/collect/cancelCollect",parm)
}