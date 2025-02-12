<template>
	<view>
		<radio-group @change="radioChange">
			<view class="item" v-for="(res, index) in siteList.list" :key="res.id">

				<radio :value="JSON.stringify(res)" :checked="res.addressId == store.checkedId" />
				<view style="flex-grow: 1;">
					<view class="top">
						<view class="name">{{ res.userName }}</view>
						<view class="phone">{{ res.phone }}</view>
						<view class="tag">
							<text v-if="res.status == '1'" style="background-color: #f3af28;">默认</text>
						</view>
					</view>
					<view class="bottom">
						{{res.area}},{{res.address}}
						<up-icon @click="update(res)" name="edit-pen" :size="30" color="#999999"></up-icon>
					</view>
				</view>

			</view>

		</radio-group>
		<view class="addSite" @tap="toAddSite">
			<view class="add">
				<up-icon name="plus" color="#ffffff" class="icon" :size="30"></up-icon>新建收货地址
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		reactive
	} from 'vue';
	import {addressStore} from '../../store/address.js';
	import {
		addressListApi
	} from '../../api/user.js'
	const store = addressStore();
	//地址数据
	const siteList = reactive({
		list: []
	})
	//查询地址数据
	const getList = async () => {
		let res = await addressListApi({
			openid: uni.getStorageSync('openid')
		})
		console.log(res);
		if (res && res.code == 200) {
			siteList.list = res.data
		}
	}
	//跳转新增地址
	const toAddSite = () => {
		uni.navigateTo({
			url: '../address/address'
		});
	}
	//修改
	const update = (res) => {
		console.log(res);
		uni.navigateTo({
			url: '../address/address?item=' + encodeURIComponent(JSON.stringify(res))
		});
	}
	//单选点击事件
	const radioChange = (e) => {
		if(e.detail.value){
			let item = JSON.parse(e.detail.value)
			store.checkedId = item.addressId;
			store.address = item.address;
			store.area = item.area;
			store.phone = item.phone;
			store.userName = item.userName;
			//关闭页面
			uni.navigateBack()
		}
	}
	onShow(() => {
		getList();
	})
</script>

<style lang="scss" scoped>
	.item {
		padding: 40rpx 20rpx;
		display: flex;
		align-items: center;

		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;

			.phone {
				margin-left: 60rpx;
			}

			.tag {
				display: flex;
				font-weight: normal;
				align-items: center;

				text {
					display: block;
					width: 60rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					margin-left: 30rpx;
					background-color: rgb(49, 145, 253);
				}

				.red {
					background-color: red
				}
			}
		}

		.bottom {
			display: flex;
			margin-top: 20rpx;
			font-size: 28rpx;
			justify-content: space-between;
			color: #999999;
		}
	}

	.addSite {
		display: flex;
		justify-content: space-around;
		width: 600rpx;
		line-height: 100rpx;
		position: absolute;
		bottom: 30rpx;
		left: 80rpx;
		background-color: #F3AF28;
		border-radius: 60rpx;
		font-size: 30rpx;

		.add {
			display: flex;
			align-items: center;
			color: #ffffff;

			.icon {
				margin-right: 10rpx;
			}
		}
	}
</style>