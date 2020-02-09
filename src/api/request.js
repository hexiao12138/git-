import axiosInstance from './axios';


export  function requestLogin (username,password){
  return axiosInstance({
    url: '/login',
    method: 'POST',
    data:{
      username,
      password
    }
  })
};
export function reqCategory () {
  return axiosInstance({
    url: '/category/get',
    method: 'GET'
  })
};
export function reqAddCategories (categoryName){
  return axiosInstance({
    url: '/category/add',
    method: 'POST',
    data:{
      categoryName
    }
  })
}