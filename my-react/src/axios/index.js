import axios from 'axios';

axios.defaults.timeout = 120000; // 两分钟
axios.defaults.withCredentials = true; // 跨域请求，允许保存cookie
/**
 * 请求拦截
 */
axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  return config;
});
/**
 * 返回拦截
 */
axios.interceptors.response.use(data => {
  console.log('data', data)
  if(data.status !== 200) {
    return Promise.reject(new Error('error'));
  }
  return data;
}, error => {
  return Promise.reject(new Error(error))
})
export default axios;