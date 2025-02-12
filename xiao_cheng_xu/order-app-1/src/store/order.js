import {
	defineStore
} from 'pinia';

export const orderStore = defineStore('orderStore', {
	state: () => ({
		// 存储购物车数据
		orderList: [],
		type: 'order'//判断是购物车的数据还是立刻购买的，用于清空
	}),
	actions: {
		// 单条数据加入
		addOrder(carData) {
			this.orderList = []
			// 创建carData的副本，防止后续修改carData会影响购物车数据
			const newCarData = {
				...carData
			};
			// 判断是否已经加入到购物车
			const index = this.orderList.findIndex(item => item.goodsId === newCarData.goodsId && item
				.specsName == newCarData.specsName);
			// 存在，删除购物车里面的数据
			if (index > -1) {
				// 删除原来的数据
				this.orderList.splice(index, 1);
			}
			// 加到购物车
			this.orderList.push(newCarData);

		},
		//多条数据加入
		addOrderList(list) {
			this.orderList = []
			list.forEach(goods=>{
				
				this.orderList.push(goods);
			})
		
		}

	},
});