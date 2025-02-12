<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" v-model="address.userName" placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="text" v-model="address.phone" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<input disabled type="text" placeholder-class="line" v-model="address.area" placeholder="省市区县、乡镇等" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea type="text" v-model="address.address" placeholder-class="line" placeholder="街道、楼牌等" />
			</view>
		</view>
		<view class="bottom">
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right">
					<switch color="red" :checked="address.status == '1'" @change="setDefault" />
				</view>
			</view>
		</view>
		<up-picker @cancel="show = false" :show="show" ref="uPickerRef" :columns="columns" @confirm="confirm"
			@change="changeHandler"></up-picker>
	</view>
	<up-button @click="addBtn" text="提交" :custom-style="customStyle" type="warning"></up-button>
</template>

<script setup>
	import {
		onLoad,
		onReady,
		onShow
	} from '@dcloudio/uni-app';

	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import {
		addAddressApi,
		editAddressApi
	} from '../../api/user.js'
	const show = ref(false);
	const customStyle = reactive({
		margin: '20px',
		width: 'auto',
	});
	const finalAddress = ref('');
	const setDefault = (dom) => {
		dom.detail.value ? address.status = 1 : address.status = 0
	};
	const showRegionPicker = () => {
		show.value = true;
		// Initialize columns with default values

	};

	const provinces = ['北京市', '上海市', '广东省'];
	const cities = {
		'北京市': ['北京市'],
		'上海市': ['上海市'],
		'广东省': ['广州市', '深圳市', '东莞市']
	};
	const districts = {
		'北京市': {
			'北京市': ['东城区', '西城区', '朝阳区']
		},
		'上海市': {
			'上海市': ['黄浦区', '徐汇区', '长宁区']
		},
		'广东省': {
			'广州市': ['越秀区', '荔湾区', '天河区'],
			'深圳市': ['福田区', '罗湖区', '南山区'],
			'东莞市': ['莞城区', '南城区', '东城区']
		}
	};

	const columns = reactive([
		[],
		[],
		[]
	]);

	const uPickerRef = ref(null);
	onMounted(() => {
		columns[0] = provinces;
		columns[1] = cities[provinces[0]] || [];
		columns[2] = districts[provinces[0]]?.[columns[1][0]] || [];
		uPickerRef.value.setColumnValues(0, provinces);
		uPickerRef.value.setColumnValues(1, columns[1]);
		uPickerRef.value.setColumnValues(2, columns[2]);
	})
	const updateColumns = (columnIndex, index) => {
		if (columnIndex === 0) {
			const selectedProvince = provinces[index];
			const newCities = cities[selectedProvince] || [];
			uPickerRef.value.setColumnValues(1, newCities);
			const newDistricts = districts[selectedProvince]?.[newCities[0]] || [];
			uPickerRef.value.setColumnValues(2, newDistricts);
		} else if (columnIndex === 1) {
			const selectedProvince = uPickerRef.value.getValues()[0];
			const selectedCity = cities[selectedProvince][index];
			const newDistricts = districts[selectedProvince]?.[selectedCity] || [];
			uPickerRef.value.setColumnValues(2, newDistricts);
		}
	};

	const changeHandler = ({
		columnIndex,
		index
	}) => {
		updateColumns(columnIndex, index);
	};

	const confirm = (e) => {
		const {
			value
		} = e;
		if (Array.isArray(value)) {
			const [province, city, district] = value;
			address.area = `${province} ${city} ${district || ''}`;
		} else {
			address.area = '';
		}
		show.value = false;
	};
	//表单绑定的数据
	const address = reactive({
		addressId: '',
		openid: uni.getStorageSync('openid'),
		userName: '',
		phone: '',
		area: '',
		address: '',
		status: 0
	})
	//提交
	const addBtn = async () => {
		console.log(address);
		//表单验证
		if (!address.userName) {
			uni.showToast({
				title: '请输入收货人姓名',
				icon: 'none'
			})
			return;
		}
		if (!address.phone) {
			uni.showToast({
				title: '请输入手机号',
				icon: 'none'
			})
			return;
		}
		if (!address.area) {
			uni.showToast({
				title: '请选择地区',
				icon: 'none'
			})
			return;
		}
		if (!address.address) {
			uni.showToast({
				title: '请填写地址',
				icon: 'none'
			})
			return;
		}
		let res = null;
		if(type.value == 0){
			res = await addAddressApi(address)
		}else{
			res = await editAddressApi(address)
		}
		if(res&&res.code==200){
		//返回列表
			uni.navigateBack()
		}
	}
	//区分是新增 0还是编辑 1
	const type = ref(0)
	onReady(() => {
		if (type.value) {
			uni.setNavigationBarTitle({
				title: '编辑地址'
			})
		}
	})
	onLoad((options) => {
		if (options.item) {
			type.value = 1;
			const item = JSON.parse(decodeURIComponent(options.item));
			console.log(item);
			address.addressId = item.addressId
			address.userName = item.userName
			address.phone = item.phone
			address.area = item.area
			address.address = item.address
			address.status = item.status
			address.openid = item.openid
		}

		// if (!options.goods) {
		// 	throw new Error('goods 属性缺失');
		// }
		// // 解码传入的参数
		// const decodedGoods = decodeURIComponent(options.goods);
		// // 解析 JSON 字符串
		// const goods = JSON.parse(decodedGoods);
		// swiperList.value = goods.goodsImage.split(',')
		// goodsUnit.value = goods.goodsUnit
		// goodsDesc.value = goods.goodsDesc
		// title.value = goods.goodsName
		// price.value = goods.specs[0].goodsPrice
		// specs.value = goods.specs
		// //设置购物车的数据
		// carData.goodsId = goods.goodsId
		// carData.goodsImage = goods.goodsImage.split(',')[0]
		// carData.goodsName = goods.goodsName
		// carData.specsName = goods.specs[0].specsName
		// carData.price = goods.specs[0].goodsPrice
		// carData.goodsUnit = goods.goodsUnit
	})
</script>

<style lang="scss" scoped>
	:v-deep(.line) {
		color: $u-light-color;
		font-size: 28rpx;
	}

	.wrap {
		background-color: #f2f2f2;

		.top {
			background-color: #ffffff;
			border-top: solid 2rpx $u-border-color;
			padding: 22rpx;

			.item {
				display: flex;
				font-size: 32rpx;
				line-height: 100rpx;
				align-items: center;
				border-bottom: solid 2rpx $u-border-color;

				.left {
					width: 180rpx;
				}

				input {
					text-align: left;
				}
			}

			.address {
				padding: 20rpx 0;

				textarea {
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}
			}
		}

		.bottom {
			margin-top: 20rpx;
			padding: 40rpx;
			padding-right: 0;
			background-color: #ffffff;
			font-size: 28rpx;

			.default {
				margin-top: 50rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: solid 2rpx $u-border-color;
				line-height: 64rpx;

				.tips {
					font-size: 24rpx;
				}
			}
		}
	}
</style>