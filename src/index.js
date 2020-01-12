import React,{Component} from 'react';
import ReactDOM  from 'react-dom';
import {Provider,connect} from 'react-redux';
import store from './redux/store';
import App from './app';
import './index.less';
ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('root'));