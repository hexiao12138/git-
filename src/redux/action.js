import {setItem} from '../utils';
import {requestLogin,reqCategory} from '../api/request';
import {reqAddCategories} from '../api/request';
 
export const removeUser = ()=> ({type: 'REMOVE_USER'});

export const changeLanuage = (lanuage) => ({type: 'CHANGE_LANUAGE',data: lanuage});
const saveUser = (user)=> ({
 type: 'SAVE_USER',
 data: user
});
export const saveUserAsync =  (username,password)=> {
  return dispatch =>{
    //发送请求
   return requestLogin(username,password)
    .then(response=>{
      //存储用户数据到redux和localstorage
      setItem('user',response);
      dispatch(saveUser(response))
    })
  }
};

const getCategory = (categories) => ({type: 'GET_CATEGORIES',data: categories});
export const getCategoryAsync = () => {
  return dispatch => {
    //发送请求,请求数据
   return reqCategory()
    .then(response=>{     
      dispatch(getCategory(response));    
    })
    
  }
};
const addCategory = categoryName  => ({type:'ADD_CATEGORY',data: categoryName})
export const addCategoryAsync = (categoryName) => {
    return dispatch => {
      return reqAddCategories(categoryName)
      .then(()=> {
        dispatch(addCategory(categoryName))
      })
    }
}


