import http from '@/http'
import { OrderListParm } from "./OrderModel"

//列表
export const getPcOrderListApi = (parm: OrderListParm) => {
    return http.get('/wxapi/order/getPcOrderList', parm)
}
//发货
export const sendOrderApi = (orderId: string) => {
    return http.post('/wxapi/order/sendOrder', { orderId })
}