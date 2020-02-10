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
};
export function reqUpdateCategories (categoryName,categoryId){
  return axiosInstance({
    url: '/category/update',
    method: 'POST',
    data:{
      categoryName,
      categoryId
    }
  })
};

export function reqDeleteCategories (categoryId){
  return axiosInstance({
    url: '/category/delete',
    method: 'POST',
    data:{   
      categoryId
    }
  })
};
export function reqProduct (pageNum,pageSize) {
  return axiosInstance({
    url: '/product/list',
    method: 'GET',
    params:{
      pageNum,
      pageSize
    }
  })
}