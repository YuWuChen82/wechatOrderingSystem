<template>
	<view class="address" @click="toAddress()">
		<view>
			<view class="info">
				<view class="name">
					{{astore.userName}}
				</view>
				<view class="phone">
					{{astore.phone}}
				</view>

			</view>
			<view>
				{{astore.area}}{{astore.address}}
			</view>
		</view>
		<up-icon name="arrow-right" color="#c8c9cc"></up-icon>
	</view>
	<view style="padding-bottom: 60rpx;margin-top: 10px" v-if="goods.length>0">
		<view class="goods-detail" v-for="(item,index) in goods" :key="index">
			<view class="detail-left">

				<view class="goods-left">
					<image :src="item.goodsImage" style="width: 150rpx;height: 140rpx;margin-left: 10px;"></image>
				</view>
				<view class="size">

					<text style="font-size: 25rpx;">名称：{{item.goodsName}}</text>
					<text style="font-size: 25rpx;">规格：{{item.specsName}}</text>
					<text class="goods-price">￥{{item.price}}{{item.goodsUnit}}</text>
				</view>
			</view>
			<view class="detail-right">
				<text class="num">x{{item.num}}</text>
			</view>
		</view>

	</view>

	<view class="end">
		<view class="end-left">
			<view>
				总计：<text style="color: #f00;font-weight: bold;">￥ {{totalPrice}}</text>
			</view>

		</view>
		<view class="end-right" @click="commitBtn">
			提交订单({{totalNum}})
		</view>


	</view>

</template>

<script setup>
	import {
		ref,
		reactive,
		computed
	} from 'vue';
	import {
		orderStore
	} from '../../store/order.js'
	import {
		addressStore
	} from '../../store/address.js'
	import {
		carStore
	} from '../../store/car.js'
	import {
		getAddressApi
	} from '../../api/user.js'
	import {
		splaceOrderApi
	} from '../../api/order.js'
	import {
		onLoad
	} from '@dcloudio/uni-app';
	const store = orderStore()
	const astore = addressStore()
	const goods = computed(() => {
		return store.orderList
	})

	const totalNum = computed(() => {
		let totalNum = 0;
		store.orderList.map(item => {
			item.flag ? totalNum += item.num : totalNum += 0;
		})

		return totalNum;
	})
	const totalPrice = computed(() => {
		let totalPrice = 0;
		store.orderList.map(item => {
			item.flag ? totalPrice += item.num * item.price : totalPrice += 0;
		})
		return totalPrice;
	})
	//跳转地址列表
	const toAddress = (item) => {
		uni.navigateTo({
			url: '../addresslist/addresslist'
		})
	}
	//查询默认地址
	const getAddress = async () => {
		let res = await getAddressApi({
			openid: uni.getStorageSync('openid')
		})
		console.log(res)
		if (res && res.code == 200) {
			astore.checkedId = res.data.addressId;
			astore.address = res.data.address;
			astore.area = res.data.area;
			astore.phone = res.data.phone;
			astore.userName = res.data.userName;
		}
	}
	onLoad(() => {
		getAddress()
	})
	//提交订单
	const commitBtn = async () => {
		let commitParm = reactive({
			openid: uni.getStorageSync('openid'),
			userName: astore.userName,
			phone: astore.phone,
			address: astore.area + "," + astore.address,
			price: totalPrice.value,
			details: store.orderList
		});
		let res = await splaceOrderApi(commitParm)

		console.log(res);
		if (res && res.code == 200) {
			//清空确认订单的货物
			store.orderList = [];
			if (store.type == 'car') {
				console.log(carStore().carList);
				carStore().carList = [];
			}
			uni.navigateBack();
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}

	.address {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		padding: 10px 20px;

		.info {
			display: flex;

			.name {
				font-size: 15px;
				font-weight: 600;
			}

			.phone {
				margin-left: 10px;
			}
		}
	}

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