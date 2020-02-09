
import {combineReducers} from 'redux';
import {getItem} from '../utils';
  function user(prevState=getItem('user') || {},action){
  switch(action.type){
    case 'SAVE_USER': 
    return action.data;
    case 'REMOVE_USER':
      return {};
    default:
      return prevState; 
  }

  
};
const lanuage = navigator.language || navigator.languages[0] || 'zh-CN';
function lanuages (prevState=lanuage,action) { 
  switch(action.type){
    case 'CHANGE_LANUAGE':
      return action.data;
    default: 
    return prevState
  }

};

function getCategories (prevState=[],action) { 
  switch(action.type){
    case 'GET_CATEGORIES':
      return action.data;
    case 'ADD_CATEGORY':
      return [...prevState,action.data]
    default: 
    return prevState
  }
};


export default combineReducers({
  user,
  lanuages,
  getCategories
})