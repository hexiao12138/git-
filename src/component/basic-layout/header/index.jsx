
import {Button,Icon,Modal} from 'antd';
import React,{useCallback,useState,useEffect,useMemo} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import screenfull from 'screenfull';
import dayjs from 'dayjs';
import {injectIntl,FormattedMessage} from 'react-intl';
import {removeItem} from '../../../utils';
import './index.less';
import {removeUser,changeLanuage} from '../../../redux/action';
import menus from '../../../config/menu';
 function Header ({history,removeUser,username,changeLanuage,lanuage,intl,location:{pathname}}) {
const [isScreenFull,setIsScreenFull] = useState(false);
const [date,setDate] = useState(Date.now());
const screenFull = useCallback(
  () => {
    screenfull.toggle();
    
  },
  [],
);

const exit = useCallback(
  ()=>{
    Modal.confirm(
      {
        title:intl.formatMessage({ id: 'hint' }) ,
        onOk(){
          //清空用户数据
          removeItem('user');
          removeUser();
          //跳转地址
          history.replace('/login');
        }
      }
    )
  },[history,removeUser,intl]
);
 const handleChange = useCallback(
   ()=>{
      setIsScreenFull(!isScreenFull);
   },[isScreenFull]
 );

 const changeLan = useCallback(
   () => {
      const lanuages = lanuage === 'en' ? 'zh-CN': 'en';
      changeLanuage(lanuages);
   },[changeLanuage,lanuage]
 );


 
useEffect(
 
  ()=>{
    screenfull.on('change',handleChange);
   
 const timer =  setInterval(()=>{
      setDate(Date.now());
    },1000);
    
    
    return ()=>{
    screenfull.off('change', handleChange);
    clearInterval(timer);
  }
   } 
);
const title = useMemo(() => {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    // 二级菜单
    if (menu.children) {
      for (let index = 0; index < menu.children.length; index++) {
        const cMenu = menu.children[index];
        if (pathname.indexOf(cMenu.path) !== -1) {
          return cMenu.title;
        }
      }
    } else {
      if (menu.path === pathname) {
        return menu.title;
      }
    }
  }
}, [pathname]);

  return(
    
      <div className='headMain'>
        
        <div className="head-top">
          <Button  size='small' onClick = {screenFull} >
              <Icon type={isScreenFull? 'fullscreen-exit': 'fullscreen'}></Icon>
          </Button>
          <Button size='small' className='english' onClick={changeLan}>
            <FormattedMessage id='lanuage' />
          </Button>
              <span>hello,{username}</span>
          <Button type='link' className='exit' onClick={exit}>
            <span>
               退&nbsp;&nbsp;出
            </span> 
          </Button>
        </div>
        <div className="head-bottom">
            <span className='home-page'>
              <FormattedMessage id={title}/>
            </span>
            <span className='time'>
              {
                dayjs(date).format('YYYY-MM-DD HH:mm:ss')
              }
              
            </span>
        </div>
      </div>
   
  )
};

export default injectIntl(
  connect(state => ({username: state.user.user && state.user.user.username,lanuage: state.lanuages}),{
  removeUser,
  changeLanuage
})(withRouter(Header)
)
) ;