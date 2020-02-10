import {setItem} from '../utils';
import {requestLogin,reqCategory,reqUpdateCategories,reqDeleteCategories} from '../api/request';
import {reqAddCategories} from '../api/request';
import {REMOVE_USER,CHANGE_LANUAGE,SAVE_USER,GET_CATEGORIES,ADD_CATEGORY,UPDATE_CATEGORY,DELETE_CATEGORY} from './actionType';
export const removeUser = ()=> ({type: REMOVE_USER});

export const changeLanuage = (lanuage) => ({type: CHANGE_LANUAGE,data: lanuage});
const saveUser = (user)=> ({
 type: SAVE_USER,
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

const getCategory = (categories) => ({type: GET_CATEGORIES,data: categories});
export const getCategoryAsync = () => {
  return dispatch => {
    //发送请求,请求数据
   return reqCategory()
    .then(response=>{     
      dispatch(getCategory(response));    
    })
    
  }
};
const addCategory = category  => ({type:ADD_CATEGORY,data: category})
export const addCategoryAsync = (categoryName) => {
    return dispatch => {
      return reqAddCategories(categoryName)
      .then((response)=> {
        dispatch(addCategory(response))
      })
    }
};
const updateCategory = category  => ({type:UPDATE_CATEGORY,data: category})
export const updateCategoryAsync = (categoryName,categoryId) => {
    return dispatch => {   
      return reqUpdateCategories(categoryName,categoryId)
      .then((response)=> {
        console.log(response);       
        dispatch(updateCategory(response))
      }).catch((err)=>{
        console.log(err);       
      })
    }
};
const deleteCategory = category  => ({type:DELETE_CATEGORY,data: category})
export const deleteCategoryAsync = (categoryId) => {
    return dispatch => {   
      return reqDeleteCategories(categoryId)
      .then((response)=> {
        dispatch(deleteCategory(response))
      })
    }
}



