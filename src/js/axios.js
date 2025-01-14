import axios from 'axios'; // 基于Promise的Http库，可用于node和浏览器，支持拦截器
import { getToken } from '@/js/cookie';

const fetch = axios.create({
  timeout: 300000
});

fetch.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    if(getToken()) {
      config.headers['access_token'] = getToken();
    }
    return config;
  }
);

// 添加响应拦截器
fetch.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data;
  },
  error => {
    // 对响应错误做点什么
    if (error.response) {
      // 服务器返回了状态码，但状态码不在 2xx 范围内
      console.log('错误状态码:', error.response.status);
      if ([401, 403].includes(error.response.status)) {
        // 例如，未授权，跳转到登录页面
        window.location.href = '/#/login';
      }
    } else if (error.request) {
      // 发送了请求，但没有收到响应
      console.log('没有收到响应:', error.request);
    } else {
      // 发生了其他错误
      console.log('错误信息:', error.message);
    }
    return Promise.reject(error);
  }
);

export default fetch;