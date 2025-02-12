import {
	defineStore
} from 'pinia';

export const carStore = defineStore('carStore', {
	state: () => ({
		// 存储购物车数据
		carList: []
	}),
	actions: {
		// 加入购物车
		addCar(carData) {
			// 创建carData的副本，防止后续修改carData会影响购物车数据
			const newCarData = {
				...carData
			};
			// 判断是否已经加入到购物车
			const index = this.carList.findIndex(item => item.goodsId === newCarData.goodsId && item
				.specsName == newCarData.specsName);
			// 存在，删除购物车里面的数据
			if (index > -1) {
				// 删除原来的数据
				this.carList.splice(index, 1);

			}
			// 加到购物车
			this.carList.push(newCarData);

		}

	},
});