import axios from 'axios'
import store from '../store'
// 1.创建axios实例
const service = axios.create({
    // 公共接口--这里注意后面会讲,url = base url + request url
    baseURL: process.env.VUE_APP_SERVER_URL,

    // baseURL: 'https://api.example.com',
    // 超时时间 单位是ms，这里设置了5s的超时时间
    timeout: 5 * 1000
})

// 2.请求拦截器request interceptor
service.interceptors.request.use(
    config => {
        // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
        // 注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
        if (store.state.user.token) {
          config.headers['token'] = store.state.user.token
        }
        return config
    },
    error => {
        // do something with request error
        // console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 设置cross跨域 并设置访问权限 允许跨域携带cookie信息,使用JWT可关闭
// service.defaults.withCredentials = false

service.interceptors.response.use(
    // 接收到响应数据并成功后的一些共有的处理，关闭loading等
    response => {
        const res = response.data
        // 如果自定义代码不是200，则将其判断为错误
        console.log('request/response', res);
        if (res.code === 200) {
            if (res.message !== 'success') {
                store.commit('successTip',res.message);
            }
            return Promise.resolve(res)
        }else {
            switch (res.code) {
                case 400:
                    store.commit('errorTip',res.message)
                    break
                case 401:
                    store.commit('warningTip',res.message)
                    break
            }
            return Promise.reject(res)
        }

    },
    error => {
        console.log('request/error',error)
    }
)
export default service
