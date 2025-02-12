<template>

	<up-swiper :list="swiperList" keyName="images" showTitle :autoplay="true" circular height="200"></up-swiper>
	<up-divider text="热门推荐" textColor="#F3AF28"></up-divider>
	<view class="wrap">
		<up-waterfall v-model="flowList" ref="uWaterfallRef">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<up-lazy-load @click="toDeatils(item)" threshold="-10" border-radius="10"
						:image="item.goodsImage.split(',')[0]" :index="index"></up-lazy-load>
					<view class="demo-title">
						{{item.goodsName}}
					</view>
					<view class="price-item">
						<view class="demo-price">
							{{item.specs[0].goodsPrice}}元
						</view>
						<view class="demo-title">
							{{item.goodsUnit}}
						</view>
						<image class="carimg" :src="carimg" @click="toDeatils(item)"></image>
					</view>


				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<up-lazy-load @click="toDeatils(item)" threshold="-450" border-radius="10"
						:image="item.goodsImage.split(',')[0]" :index="index"></up-lazy-load>
					<view class="demo-title">
						{{item.goodsName}}
					</view>
					<view class="price-item">
						<view class="demo-price">
							{{item.specs[0].goodsPrice}}元
						</view>
						<view class="demo-title">
							{{item.goodsUnit}}
						</view>
						<image class="carimg" :src="carimg" @click="toDeatils(item)"></image>
					</view>
				</view>
			</template>
		</up-waterfall>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		reactive,
		ref
	} from 'vue';
	import {
		userLogin
	} from '../../api/user.js'
	import {
		getSwipperListApi,
		getHotListApi
	} from '../../api/home.js'
	const carimg = ref("/static/goodscar.png")
	// 使用 reactive 创建响应式对象数组  
	const swiperList = ref()
	//列表数据
	// const flowList = ref([])
	const flowList = ref()
	//获取轮播图数据
	const getSwipperList = async () => {
		let res = await getSwipperListApi()
		if (res && res.code == 200) {
			swiperList.value = res.data
		}
	}
	const getHotList = async () => {
		let res = await getHotListApi()
		if (res && res.code == 200) {
			flowList.value = res.data
		}

	}
	//跳转详情
	const toDeatils = (item) => {
		uni.navigateTo({
			url: '../detail/detail?goods=' + encodeURIComponent(JSON.stringify(item))
		});
	}
	onLoad(() => {
		userLogin()
		console.log("userLogin")
		getSwipperList();
		getHotList();
	})
</script>
<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>
<style lang="scss">
	.wrap {
		padding: 0px 4px;
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-primary;
		color: $u-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}

	.price-item {
		display: flex;
		align-items: center;
	}

	.carimg {
		height: 50rpx;
		width: 50rpx;
		margin-top: 5px;
		margin-left: 8px;
	}
</style>