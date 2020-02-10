import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import React from 'react';
import {ConfigProvider } from 'antd'
import {IntlProvider} from 'react-intl';
import {connect} from 'react-redux';
import Login from './component/login';
import BasicLayOut from './component/basic-layout';
import {en,zhCn} from './locals';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import routes from './config/routes';
 function App ({languages}){


  const language = languages;
 
  
  const message = language === 'en' ? en: zhCn;
  return (
    <ConfigProvider locale={language === 'en'? enUS : zhCN}>
      <IntlProvider locale={language} messages={message}>
      <Router>
        <Switch> 
        <BasicLayOut>
            {
              routes.map((route)=> <Route {...route} key={route.path}></Route>)
            }
          </BasicLayOut> 
          <Route path='/login' exact component={Login}/>       
                  
        </Switch>
      
      </Router>
      </IntlProvider>
    </ConfigProvider>
    
   
  )
}
export default connect(
  state => ({languages: state.lanuages}),
  null
)(App)
