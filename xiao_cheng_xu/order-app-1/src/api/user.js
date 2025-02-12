import http from '../common/http.js'
import {userStore} from '../store/user.js'

//获取code
export const getCode = () => {
	console.log('getCode');
	const promise = new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: (res) => {
				console.log('888', res.code);
				//如果返回数据
				if (res && res.code) {
					//数据返回
					resolve(res.code)
				} else {
					reject(res)
				}
			}
		})
	}).catch(res => {
		uni.showToast({
			title: res.errMsg || '获取code失败',
			icon: 'none'
		})
	})
	return promise;
}
//获取头像昵称
export const getUserInfoApi = (parm)=>{
	return http.get("/wxapi/wxUser/getUserInfo",parm)
}

//小程序登录
export const wxLoginApi = (code) => {
	console.log('wxLoginAPi,code', code);
	return http.post('/wxapi/user/wxlogin', {
		code: code
	})
}
//封装登录
export const userLogin = async () => {
	const store = userStore();
	//获取code
	let res = await getCode()
	console.log('userLogin,code', res);
	//登录，调用后端接口
	const {
		data
	} = await wxLoginApi(res)
	console.log('登录', data);
	if (data) {
		//存储
		uni.setStorageSync('openid', data.openId)
		uni.setStorageSync('sessionkey', data.sessionKey)
		let result = await getUserInfoApi({
			openid: data.openId,
		})
		console.log('result',result);
		if(result.data){
			if(result.data.avatarUrl){
				store.setAvatarUrl(result.data.avatarUrl)
				uni.setStorageSync('avatarUrl',result.data.avatarUrl)
			}
			if(result.data.nickName){
				store.nickName = result.data.nickName
				uni.setStorageSync('nickName',result.data.nickName)
			}
		}
		
	}
}
//新增地址
export const addAddressApi = (parm) => {
	return http.post('/wxapi/address', parm)
}

//新编辑地址
export const editAddressApi = (parm) => {
	return http.put('/wxapi/address', parm)
}

//地址列表
export const addressListApi = (parm) => {
	return http.get('/wxapi/address/list', parm)
}

//默认地址查询
export const getAddressApi = (parm) => {
	return http.get('/wxapi/address/getAddress', parm)
}

//头像上传
export const uploadImageApi = (parm)=>{
	return http.upload(parm);
}

//头像昵称更新
export const saveOrUpdateApi = (parm)=>{
	return http.post("/wxapi/wxUser/saveOrUpdate",parm)
}

//新增评论
export const addCommentApi = (parm)=>{
	return http.post("/wxapi/comment/addComment",parm)
}

//查询收藏列表
export const getCollectListApi = (parm)=>{
	return http.get("/wxapi/collect/list",parm)
}
