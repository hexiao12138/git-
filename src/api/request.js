import axios from 'axios';
import errCode from '../config';
 const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 20000
});

//设置请求拦截器函数
axiosInstance.interceptors.request.use(
  config => {
    let token = '';
    if(token){
      config.headers.authorization = `Bearer ${token} `;
    }
    if(config.method === 'post'){
       config.data = Object.keys(config.data).reduce((pre,curr)=>{
         return pre += `&${curr}=${config.data[curr]}`
       },'').slice(1);      
       config.headers['content-type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  }
);

//设置响应拦截器函数
axiosInstance.interceptors.response.use(
  response =>{
    if(response.data.status === 0){
      return response.data.data
    }else{
      return Promise.reject(response.data.msg)
    }
  },

  err => {
    let msg = '';
    if(err.response){
      msg = errCode[err.response.status]
    }else {
      if(err.message.indexOf('Network Error') !== -1){
        msg = '网络连接失败，请重新连接网络试试';
      }else if(err.message.indexOf('timeout') !== -1){
        msg = '网络连接超时，请刷新网络试试'
      }
    }
    return Promise.reject(msg || '网络连接超时，请连上wifi试试');
  }
)
export default axiosInstance;