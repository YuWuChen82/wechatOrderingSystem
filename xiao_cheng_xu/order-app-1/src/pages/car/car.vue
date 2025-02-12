<template>
	<view style="padding-bottom: 60rpx;" v-if="goods.length>0">
		<view class="goods-detail" v-for="(item,index) in goods" :key="index">
			<view class="detail-left">

				<view class="goods-left">
					<checkbox-group @change="selected($event,item)">
						<label>
							<checkbox :checked="item.flag" />
						</label>
					</checkbox-group>
					<image :src="item.goodsImage" style="width: 150rpx;height: 140rpx;margin-left: 10px;"></image>
				</view>
				<view class="size">

					<text style="font-size: 25rpx;">名称：{{item.goodsName}}</text>
					<text style="font-size: 25rpx;">规格：{{item.specsName}}</text>
					<text class="goods-price">￥{{item.price}}{{item.goodsUnit}}</text>
				</view>
			</view>
			<view class="detail-right">
				<text class="subtract" @click="reduce(item)">-</text>
				<text class="num">{{item.num}}</text>
				<text class="add" @click="add(item)">+</text>
			</view>
		</view>

	</view>

	<view class="end">
		<view class="end-left">
			<checkbox-group @change="selectAlls()">
				<label>
					<checkbox :checked="allcheck" />全选
				</label>
			</checkbox-group>
			<view>
				总计：<text style="color: #f00;font-weight: bold;">￥ {{totalPrice}}</text>
			</view>

		</view>
		<view class="end-right" @click="confirm()">
			结算({{totalNum}})
		</view>
		  

	</view>

</template>

<script setup>
	import {
		ref,
		reactive,
		computed
	} from 'vue';
	import {carStore} from '../../store/car.js'
	import {orderStore} from '../../store/order.js'
	const store = carStore()
	const oStore = orderStore()
	const show = ref(true)
	const allcheck = ref(true)
	const checked = ref(true)
	//获取购物车的额数据
	const goods = computed(() => {
		if(store.carList.length == 0){
			allcheck.value = false;
		}else{
			allcheck.value = true;
		}
		return store.carList
	})
	// //购物车的数据
	// const carData = ref({
	// 	flag: true,
	// 	goodsImage: '',
	// 	goodsName: '',
	// 	specsName: '',
	// 	goodsUnit: '/',
	// 	price: '',
	// 	num: 1,
	// 	goodsId:'',
	// })
	
	

	//复选框的点击事件
	const selected = (e, item) => {
		if (item.flag == true) {
			item.flag = false
		} else {
			item.flag = true
		}
		//全选的设置
		//找出选中的数据、
		let newArr = store.carList.filter(item => item.flag == true)
		if (newArr.length == store.carList.length) {
			allcheck.value = true;
		} else {
			allcheck.value = false;
		}
	}
	//全选的点击事件
	const selectAlls = () => {
		if (allcheck.value == true) {
			allcheck.value = false;
			store.carList.forEach(item => {
				item.flag = false;
			})
		} else {
			allcheck.value = true;
			store.carList.forEach(item => {
				item.flag = true;
			})
		}
		// console.log(store.carList);
	}
	//加号点击事件
	const add = (item) => {
		item.num++;
	}
	//减号点击事件
	const reduce = (item) => {
		let num = item.num;
		if (num > 1) {
			num -= 1;
		} else if (num == 1) {
			// console.log('store.carList',store.carList);
			// console.log('item',item);
			store.carList.map((dom,i)=>{
				if(dom.goodsId == item.goodsId && dom.specsName == item.specsName){
					store.carList.splice(i,1)
				}
			})
		}
		item.num = num;
	}
	const totalNum = computed(() => {
		let totalNum = 0;
		store.carList.map(item => {
			item.flag ? totalNum += item.num : totalNum += 0;
		})

		return totalNum;
	})
	const totalPrice = computed(() => {
		let totalPrice = 0;
		store.carList.map(item => {
			item.flag ? totalPrice += item.num * item.price : totalPrice += 0;
		})
		return totalPrice;
	})
	//跳转确认订单
	const confirm = (item)=>{
		//如果没有数据，信息提示
		if(store.carList.length == 0){
			uni.showToast({
				title:'请选择菜品',
				icon:'none'
			})
			return;
		}
		oStore.addOrderList(store.carList);
		oStore.type = 'car'
		//跳转确认订单页面
		uni.navigateTo({
			url: '../confirm/confirm'
		})
	}
</script>

<style lang="scss">
	.goods-detail {
		display: flex;
		padding: 30rpx 15rpx 30rpx 30rpx;
		background-color: #fff;
		justify-content: space-between;
		border-bottom: 5rpx solid #f1f1f1;
		align-items: center;

		.detail-left {
			display: flex;

			.goods-left {
				display: flex;
				align-items: center;
			}

			.size {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-left: 30rpx;

				.goods-price {
					font-size: 25rpx;
					color: #f44545;
				}
			}
		}

		.detail-right {
			text {
				width: 50rpx;
				line-height: 50rpx;
				text-align: center;
				display: inline-block;
				background: #f7f7f7;
				margin-right: 10rpx;
			}

			.add {
				color: #FA4305;
				border-radius: 10rpx 30rpx 30rpx 10rpx;
				margin-right: 20rpx;
			}

			.subtract {
				border-radius: 30rpx 10rpx 10rpx 30rpx;

			}
		}
	}

	.end {
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;

		.end-left {
			width: 70%;
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;
		}

		.end-right {
			width: 30%;
			line-height: 90rpx;
			background: #f3af28;
			text-align: center;
			color: #fff;
		}
	}
</style>