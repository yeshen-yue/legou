import { Toast } from 'vant';
import axios from 'axios';
var loading, instance, host;
if (process.env.NODE_ENV == "development") {
    host = "http://shop.bufantec.com/bufan"
} else {
    host = "http://shop.bufantec.com/bufan"
}
instance = axios.create({
    baseURL: host,
    timeout: 5000,
});
instance.interceptors.request.use(config => {
    loading = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
    });
    return config;
}, err => {
    return Promise.reject(err);
});
instance.interceptors.response.use(res => {
    loading.clear();
    return res;
}, err => {
    loading.clear();
    return Promise.reject(err);
});

export default instance;