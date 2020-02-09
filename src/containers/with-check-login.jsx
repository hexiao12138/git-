
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
export default function withCheckLogin(WrapperComponent) {
   function withCheckLogin(props) {
    
    const {user:{token},location:{pathname}} = props;
    if(token){
      if(pathname === '/login'){
        return <Redirect to='/' />
      }
    }else {
      if(pathname !== '/login'){
        return <Redirect to='/login' />
      }
    }
    return <WrapperComponent {...props}/>
  }

  return connect(state=>({user:state.user}),null)(withCheckLogin) ;
}