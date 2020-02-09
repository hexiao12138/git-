import React,{useCallback} from 'react';
import {Menu,Icon} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import menu from '../../../config/menu';
const {SubMenu}  = Menu;

 function LeftMunu ({location:{pathname}}){
  const createCmenu = useCallback(
    cMenu => {
     
      return <Menu.Item key={cMenu.path}>
                   <Link to={cMenu.path}>
                    <Icon type={cMenu.icon} />
                     <FormattedMessage id={cMenu.title}/>
                   </Link>
                    
                   </Menu.Item>
     
  },
  []
);

 const createMenu = useCallback(
   menus => {
    return menus.map(item => {
      if(item.children){
        return (
         
           <SubMenu
            key={item.path}
            title={
              <span>
                <Icon type={item.icon} />
                <FormattedMessage id={item.title}/>
              </span>
            }
          >
          
          {
            item.children.map(cItem => {
          
              return  createCmenu(cItem)
            })
          }
          </SubMenu>
        )
      }else{           
       return  createCmenu(item);
      }
      
    })
   }
    
 ,[createCmenu]);

 const findPath = useCallback(
   (pathname,menus) => {
    const menu =  menus.find(menu => menu.children &&  menu.children.find(cMenu =>  cMenu.path === pathname ) );
    if(menu){
      return menu.path;
    } 
     
   }, []
 );
  
       
   
     
   
 return <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[findPath(pathname,menu)]} mode="inline">
           {
             createMenu(menu)
           }
          </Menu>
}


export default withRouter(LeftMunu);
