import React from 'react';
import axios from 'axios';
import {message} from 'antd';

export default function test (){
  
  const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 20000
  })
  //请求拦截器
  axiosInstance.interceptors.request.use(
    config => {

      if(token){
        config.headers.authorization = `Bearer ${token}`;
      }

      if(config.method === 'post'){
        const keys = Object.keys(config.data);
        config.data = keys.reduce((pre,curr)=>{
          return pre += `&${curr} = ${config.data[curr]}`
        },'').substring(1);
        config.headers['content-type'] = 'application/x-www-form-urlencoded';
       
      }
   return config
    }
 
  );
  //响应拦截器
  axiosInstance.interceptors.response.use(
   response => {
   if(response.data.status === 0){
    
     return response.data.data
   }else{
     return Promise.reject(response.data.msg)
   }
   },
   err => {
      return Promise.reject(err)
   }
  )
  let token = '';
  const submit1 = ()=>{
    axiosInstance({
      method: 'POST',
      url: '/login',
      data:{
        username: 'admin',
        password: 'admin'
      }
    })
    .then(response=>{  
      console.log(response)   
     message.success(response)
    })
    .catch(err=>{
        message.error(err)
    })
  }
  const submit2 = ()=>{
      axiosInstance({
        method: 'POST',
        url: '/category/add',
        data:{
          categoryName: '人类'
        },
        headers: {authorization: `Bearer ${token}`}
      })
      .then(response=>{
        
        console.log(token)
        message.success('添加成功')
      })
      .catch(err=>{
        console.log(err,token)
        message.error('添加失败')
      })
  }
  const submit3 = ()=>{
    
  }
    return (
      <div>
        <button onClick={submit1}>登录</button>
        <button onClick={submit2}>添加分类</button>
        <button onClick={submit3}>删除分类</button>
      </div>
    )
  
}
