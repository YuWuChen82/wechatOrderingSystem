import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const config = {
    baseURL: '/api',
    timeout: 10000,
}

export interface Result<T = any> {
    code: number;
    msg: string;
    data: T;
}

class Http {
    private instance: AxiosInstance;
    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.interceptors()
    }
    //发送前的拦截器
    private interceptors() {
        this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            //设置token
            let token = "";

            if (token) {
                config.headers!['token'] = token;
            }
            return config
        }, (error: any) => {
            error.data = {}
            error.data.msg = '服务器异常，请联系管理员'
            return error
        })
        //请求返回后的拦截器
        this.instance.interceptors.response.use((res: AxiosResponse) => {
            if (res.data.code != 200) {
                ElMessage({
                    type: 'error',
                    message: res.data.msg || '服务器出错'
                })
                return Promise.reject(res.data.msg || '服务器出错')
            }
            return res.data
        }, (error) => {
            console.log('进入错误');
            error.data = {};
            if (error && error.response) {
                switch (error.response.status) {
                    case 400:
                        error.data.msg = '错误请求';
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })

                        break;
                    case 401:
                        error.data.msg = '未授权，请登录';
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })
                        break;
                    case 403:
                        error.data.msg = '拒绝访问';
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })
                        break;
                    case 404:
                        error.data.msg = '请求错误,未找到该资源';
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })
                        break;
                    case 405:
                        error.data.msg = '请求方法未允许';
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })
                        break;
                    case 408:
                        error.data.msg = '请求超时';
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })
                        break;
                    case 500:
                        error.data.msg = '服务器端出错';
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })
                        break;
                    case 501:
                        error.data.msg = '网络未实现';
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })
                        break;
                    case 502:
                        error.data.msg = '网络错误';
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })
                        break;
                    case 503:
                        error.data.msg = '服务不可用';
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })
                        break;
                    case 504:
                        error.data.msg = '网络超时';
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })
                        break;
                    case 505:
                        error.data.msg = 'http版本不支持该请求';
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })
                        break;
                    default:
                        error.data.msg = `连接错误${error.response.status}`;
                        ElMessage({
                            type: 'error',
                            message: error.data.msg
                        })
                        break;
                }
            } else {
                error.data.msg = '连接服务器失败';
                ElMessage({
                    type: 'error',
                    message: error.data.msg
                })
            }

        })
    }

    //get请求
    get<T = Result>(url: string, params?: object): Promise<T> {
        return this.instance.get(url, { params })
    }
    //post请求
    post<T = Result>(url: string, data?: object): Promise<T> {
        return this.instance.post(url, data)
    }
    //put请求
    put<T = Result>(url: string, data?: object): Promise<T> {
        return this.instance.put(url, data)
    }
    //delete请求
    delete<T = Result>(url: string): Promise<T> {
        return this.instance.delete(url)
    }
    upload<T = Result>(url: string, params?: object): Promise<T> {
        return this.instance.post(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    };


}

export default new Http(config)