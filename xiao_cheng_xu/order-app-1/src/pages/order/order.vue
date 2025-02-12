<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<up-tabs :activeStyle="{
        color: '#f29100',
        transform: 'scale(1.05)'
    }" lineColor="#f29100" :list="list" :current="current" @change="change" :scrollable="false"
					swiperWidth="750"></up-tabs>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @animationfinish="animationfinish">
				<swiper-item v-for="(item,index) in list" :key="index" class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index2) in orderList[index]" :key="res.id">
								<view class="top">
									<view class="left">
										<up-icon name="home" :size="20" color="rgb(94,94,94)"></up-icon>
										<view class="store">{{ res.userName }}</view>
										<up-icon name="arrow-right" color="rgb(203,203,203)" :size="15"></up-icon>
										<view style="margin-left: 6px;display: flex;align-items: center;" class="right">
											{{ res.phone }}
										</view>
									</view>
									<view v-if="res.status == '3'" style="color: red;">
										已取消
									</view>
								</view>
								<view>
									{{res.address}}
								</view>
								<view class="item" v-for="(item, index1) in res.goodsList" :key="index1">
									<view class="left">
										<image :src="item.goodsImage.split(',')[0]" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.goodsName }}</view>
										<view class="type">{{ item.specsName }}{{item.goodsUnit}}</view>
										<!-- <view class="delivery-time">发货时间 {{ item.createTime }}</view> -->
									</view>
									<view class="right">
										<view class="price">
											￥{{ item.price }}
											<!-- <text class="decimal">.{{ priceDecimal(item.price) }}</text> -->
										</view>
										<view class="number">x{{ item.num }}</view>
									</view>
								</view>
								<view style="display: inline-block;font-size: 24rpx;color:#868378">
									下单时间：{{res.createTime}}
								</view>
								<view class="total" style="display: inline-blockl;float: right;">
									共{{ res.goodsList.length }}件商品 合计:
									<text class="total-price">
										￥{{ res.price }}
										<!-- <text class="decimal">{{ priceDecimal(totalPrice(res.price)) }}</text> -->
									</text>
								</view>
								<view class="bottom">
									<!-- <view class="logistics btn">查看物流</view> -->
									<view @click="cancel(res,index)" v-if="res.status == '0'" class="exchange btn">取消订单
									</view>
									<view @click="confirmOrderBtn(res,index)" v-if="res.status == '1'"
										class="evaluate btn">确定收货
									</view>
									<view @click="commentBtn(res)" v-if="res.status == '2'" class="evaluate btn">评价
									</view>
								</view>
							</view>
							<up-loadmore :status="loadStatus[index]" bgColor="#f2f2f2"></up-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
	<up-modal confirmColor="#F3AF28" :zoom="false" :showCancelButton="true" :show="show" title="评论"
		@confirm="confirmBtn" @cancel="cancelBtn">
		<view style="height: 100px;">
			<textarea v-model="content" auto-height placeholder="请输入评论"></textarea>
		</view>
	</up-modal>

</template>

<script setup>
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app';
	import {
		getOrderListApi,
		cancelOrderApi,
		confirmOrderApi
	} from '../../api/order.js'
	import {
		addCommentApi
	} from '../../api/user.js'
	import {
		ref,
		reactive,
		computed
	} from 'vue';
	//要评论的订单id
	const orderId = ref('0')
	//评论弹窗显示
	const show = ref(false);
	const content = ref('');
	//评论点击事件
	const commentBtn = (item) => {
		show.value = true;
		orderId.value = item.orderId;

	}
	//评论提交
	const confirmBtn = async () => {
		if (!content.value) {
			uni.showToast({
				title: '请输入评论内容',
				icon: 'none'
			})
			return
		}
		let res = await addCommentApi({
			orderId: orderId.value,
			openid: uni.getStorageSync('openid'),
			commentText: content.value,
		})
		console.log(res);
		if (res && res.code == 200) {
			show.value = false;
		}

	}
	//评论取消
	const cancelBtn = () => {
		show.value = false;
	}
	const orderList = ref([
		[],
		[],
		[],
		[]
	]);
	const list = ref([{
			name: '全部'
		},
		{
			name: '待发货'
		},
		{
			name: '已发货'
		},
		{
			name: '已收货',
		}
	]);
	const current = ref(0);
	const swiperCurrent = ref(0);
	const tabsHeight = ref(0);
	const dx = ref(0);
	const currentPage = ref(0);
	const pageSize = ref(3);
	const pages = ref(0);
	const loadStatus = ref(['loadmore', 'loadmore', 'loadmore', 'loadmore']);

	const reachBottom = () => {
		loadStatus.value.splice(current.value, 1, "loading");
		setTimeout(() => {
			if (currentPage.value < pages.value) {
				currentPage.value++;
				getOrderList(current.value);
			} else {
				loadStatus.value.splice(current.value, 1, "nomore");

			}

		}, 1200);
	};

	const change = (e) => {
		console.log(e);
		loadStatus.value.splice(e.index, 1, 'loading');
		swiperCurrent.value = e.index;
		currentPage.value = 1;
		pages.value = 0;
		//清空数据列表
		orderList.value[current.value] = [];
		// getOrderList(e.index);
	};

	const animationfinish = (e) => {
		// console.log(e);
		swiperCurrent.value = e.detail.current;
		currentPage.value = 1;
		pages.value = 0;
		//清空数据列表
		orderList.value[current.value] = [];
		current.value = e.detail.current;
		getOrderList(e.detail.current);
	};
	//查询订单
	const getOrderList = async (idx) => {
		let res = await getOrderListApi({
			openid: uni.getStorageSync('openid'),
			type: idx == 0 ? '' : idx - 1,
			currentPage: currentPage.value,
			pageSize: pageSize.value,
		})
		if (res && res.code == 200) {
			console.log(res);
			if (res.data.records.length == 0) {
				loadStatus.value.splice(idx, 1, 'nomore');
				return;
			}
			pages.value = res.data.pages
			currentPage.value = res.data.current
			res.data.records.map(item => {
				orderList.value[idx].push(item)
			})
			loadStatus.value.splice(current.value, 1, 'loadmore')
		} else {
			loadStatus.value.splice(current.value, 1, 'nomore')

		}
	}
	//取消订单
	const cancel = (item, index) => {
		uni.showModal({
			title: '提示',
			content: '确定取消订单吗?',
			success: async function(res) {
				if (res.confirm) {
					console.log('用户点击确定');
					let res = await cancelOrderApi({
						orderId: item.orderId
					})
					if (res && res.code == 200) {
						change({
							index
						})
						getOrderList(index)
					}
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		})
	}
	const confirmOrderBtn = (item, index) => {
		uni.showModal({
			title: '提示',
			content: '确定收货吗?',
			success: async function(res) {
				if (res.confirm) {
					console.log('用户点击确定');
					let res = await confirmOrderApi({
						orderId: item.orderId
					})
					if (res && res.code == 200) {
						change({
							index
						})
						getOrderList(index)
					}
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		})
	}
	onReady(() => {
		getOrderList(0);
		// getOrderList1(0);
	});
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 10rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 140rpx;
					height: 140rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: flex-end;
			align-items: center;
			gap: 20rpx;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-info-dark;
			}

			.evaluate {
				color: $u-warning-dark;
				border-color: $u-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>