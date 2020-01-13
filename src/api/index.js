
import axiosInstance from './request'
 function request (username,password){
  return axiosInstance({
    method: 'POST',
    url: '/login',
    data:{
      username,
      password
    }
  })
}
export default request;