
import React ,{useState,useCallback}from 'react';
import { Layout, Breadcrumb } from 'antd';
import withCheckLogin from '../../containers/with-check-login';
import {FormattedMessage} from 'react-intl';
import logo from '../../assets/imgs/logo.png';
import './index.less';
import LeftMenu from './left-nav';
import HeaderMenu from './header';
const { Header, Content, Footer, Sider } = Layout;
 function BasicLayOut ({children}) {
  const [collapsed,setCollapsed] = useState(false);
  const [isDisplay,setIsDiaplay] = useState(true);
 const onCollapse = useCallback( collapsed => {     
    setCollapsed(collapsed);
    setIsDiaplay(!isDisplay);
  },[isDisplay]);
    
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo">
            <img src={logo} alt=""/>
            <h1 style={{display: isDisplay? 'block': 'none'}}>
              <FormattedMessage id='title'/>
            </h1>
          </div>
          <LeftMenu />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0,height: 80 }} >
            <HeaderMenu />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360,marginTop: 25}}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }


  export default withCheckLogin(BasicLayOut)