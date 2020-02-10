
import {combineReducers} from 'redux';
import {getItem} from '../utils';
import {REMOVE_USER,CHANGE_LANUAGE,SAVE_USER,GET_CATEGORIES,ADD_CATEGORY,UPDATE_CATEGORY,DELETE_CATEGORY} from './actionType';
  function user(prevState=getItem('user') || {},action){
  switch(action.type){
    case SAVE_USER: 
    return action.data;
    case REMOVE_USER:
      return {};
    default:
      return prevState; 
  }

  
};
const lanuage = navigator.language || navigator.languages[0] || 'zh-CN';
function lanuages (prevState=lanuage,action) { 
  switch(action.type){
    case CHANGE_LANUAGE:
      return action.data;
    default: 
    return prevState
  }

};

function getCategories (prevState=[],action) { 
  switch(action.type){
    case GET_CATEGORIES:
      return action.data;
    case ADD_CATEGORY:
      return [...prevState,action.data]
    case UPDATE_CATEGORY:
      return prevState.map((category)=>{
        if(category._id === action.data._id){
          return action.data
        }
        return category
      })
    case DELETE_CATEGORY:
      return prevState.filter(category=>{
        return category._d !== action.data._id
      })
    default: 
    return prevState
  }
};


export default combineReducers({
  user,
  lanuages,
  getCategories
})