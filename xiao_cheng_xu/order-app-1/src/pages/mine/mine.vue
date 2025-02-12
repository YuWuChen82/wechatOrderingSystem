<template>
	<view>
		<!-- <view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 container">
			<view class="userinfo u-flex-1" @click="getUserInfo">
				<view class="img-container">
					<image class="uimage" :src="avatarUrl"></image>
				</view>
				<up-divider :text="nickName"></up-divider>
			</view>
		</view> -->
		<view>
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image :src="avatarUrl" class="uimage"></image>
			</button>
			<input id="nickname-input" type="nickname" style="text-align: center;margin-top: 4rpx;" class="weui-input"
				placeholder="点击选择头像和昵称" v-model="nickName" @blur="onNickName" />
		</view>

		<view class="u-m-t-20">
			<up-cell-group>
				<up-cell @click="toOrder" icon="order" title="我的订单" :isLink="true"></up-cell>
				<up-cell @click="toCollect" icon="star" title="我的收藏" :isLink="true"></up-cell>
				<up-cell @click="toAddress" icon="map" title="我的地址" :isLink="true"></up-cell>
			</up-cell-group>
		</view>
	</view>
</template>

<script setup>
	import {
		onShow
	} from '@dcloudio/uni-app';
	import {
		getCurrentInstance,
		ref,
		computed
	} from 'vue';
	import {
		userLogin,
		uploadImageApi,
		saveOrUpdateApi,
	} from '../../api/user.js'
	import {
		userStore
	} from '../../store/user.js'
	const uStore = userStore()
	const nickName = computed(() => {
		if (uStore.nickName) {
			return uStore.nickName
		} else {
			return ''
		}
	})
	const avatarUrl = computed(() => {
		if (uStore.avatarUrl) {
			return uStore.avatarUrl
		} else {
			return '/static/mine.png'
		}
	})
	const onChooseAvatar = (e) => {
		console.log(e);
		uploadImageApi({
			url: "/api/upload/uploadImage",
			filePath: e.detail.avatarUrl
		}).then(res => {
			//图片上传成功，保存到数据库
			let result = JSON.parse(res)
			saveOrUpdateApi({
				openid: uni.getStorageSync('openid'),
				avatarUrl: result.data,
			}).then(res => {
				uStore.setAvatarUrl(result.data)
			})
		})
	}
	const instance = getCurrentInstance()
	const onNickName = (e) => {
		console.log(e);
		uni.createSelectorQuery().in(instance) // 注意这里要加上 in(this)  
			.select("#nickname-input")
			.fields({
				properties: ["value"],
			})
			.exec((res) => {
				saveOrUpdateApi({
					openid: uni.getStorageSync('openid'),
					nickName: res?.[0]?.value,
				}).then(res => {
					uStore.nickName = res?.[0]?.value

				})
			})
	}

	//跳转订单
	const toOrder = () => {
		// getUserInfo()
		uni.navigateTo({
			url: '../order/order'
		});
	}

	//跳转地址
	const toAddress = () => {
		// getUserInfo()
		uni.navigateTo({
			url: '../addresslist/addresslist'
		});
	}
	//跳转收藏
	const toCollect = () => {
		// getUserInfo()
		uni.navigateTo({
			url: '../collect/collect'
		});
	}
	onShow(() => {
		userLogin()
		// getUserInfo()
	})
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.userinfo {
		margin: 30rpx 0rpx;
	}

	.container {
		justify-content: center;
	}

	.img-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.uimage {
		height: 50px;
		width: 50px;
		border-radius: 50%;
		margin: 5px 0px;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}

	.u-cell-group {
		background-color: #fff;
	}
</style>