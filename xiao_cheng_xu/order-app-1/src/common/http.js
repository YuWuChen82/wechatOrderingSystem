// const baseUrl = "http://ck.piclass.cn:8081";
const baseUrl = "http://localhost:8081";

const http = (options = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url || '',
			method: options.type || 'GET',
			data: options.data || {},
			header: options.header || {},
		}).then(res => {
			// console.log(res);
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
};
const get = (url, data, options = {}) => {
	options.type = 'get';
	options.data = data;
	options.url = url;
	return http(options)
}
const post = (url, data, options = {}) => {
	options.type = 'post';
	options.data = data;
	options.url = url;
	return http(options)
}
const put = (url, data, options = {}) => {
	options.type = 'put';
	options.data = data;
	options.url = url;
	return http(options)
}
const upload = (parm) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseUrl + parm.url,
			filePath: parm.filePath,
			name: 'file',
			formData: {
				openid: uni.getStorageSync('openid')
			},
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})

}
export default {
	get,
	post,
	put,
	upload,
	baseUrl
}