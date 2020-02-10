import axios from 'axios';
import errCode from '../config/errCode';
import store from '../redux/store';
import {removeItem} from '../utils';
import {removeUser} from '../redux/action';
const axiosInstance = axios.create(
  {
    baseURL: '/api',
    timeout: 100000
  }
);


//请求拦截器


axiosInstance.interceptors.request.use(
  config =>{
    let token = store.getState().user.token;
    if(token){
      config.headers.authorization = `Bearer ${token}`;   
     
    }
    
    if(config.method === 'post'){
      config.data = Object.keys(config.data)
      .reduce((pre,curr)=>{
          pre += `&${curr}=${config.data[curr]}`
          return pre
      },'').slice(1);
      config.headers['content-type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  }
);

//响应拦截器

axiosInstance.interceptors.response.use(
  //响应成功
  response => {
    if(response.data.status === 0){
      return response.data.data;
    }else{
      return Promise.reject(response.data.msg)
    }
  },
  //响应失败
  err => {
     let errMsg = '';
     //接收到响应,但响应是失败的
     if(err.response){
    //解决token失效问题
     if(err.response.status === 401){
       //清空用户数据
       removeItem('user');
      store.dispatch(removeUser());
      
     }
      errMsg = errCode[err.response.status]
     }else{
       //没有接收到响应
      if(err.message.indexOf('Network Error') !== -1){
        errMsg = '网络连接失败，请重新连接网络试试';
      }else if(err.message.indexOf('timeout') !== -1){
        errMsg = '网络连接超时，请连上wifi试试';
      }
     }
     return Promise.reject(errMsg || '发生未知错误，请联系管理员');
  }
)

export default axiosInstance;