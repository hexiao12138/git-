import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import request from '../../api';
import './index.less';
import logo from './logo.png';
@Form.create()
class Login extends Component {
  validator = (rule,value,callback)=>{
    const name = rule.field==='username' ? '用户名': '密码';
   
    const reg = /^\w+$/;
    const length = value.length;
    if(!value){
      callback(`${name}不能为空`)
    }else if(length < 3){
      callback(`${name}不能小于3位`)
    }else if(length > 14){
      callback(`${name}不能大于14位`)
    }else if(!reg.test(value)){
      callback(`${name}必须是数字、字母、下划线`)
    }
    callback();
  }
  handleSubmit = (e)=>{
    e.preventDefault();
    //表单验证
    //收集收据
    //发送请求
    this.props.form.validateFields((err,values)=>{
      if(!err){
        const {username,password} = values;
       request(username,password)
        .then(response=>{
         this.props.form.replace('/')
        })
        .catch(err=>{
           
            message.error(err)
            this.props.form.resetFields(['password'])
        })

        
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='logo'>
        <header >
          <img src={logo} alt=""/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className='logo-section'>
          <p>用户登录</p>
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
         
           {
             getFieldDecorator(
               'username',
               {
                 rules:[
                  //  {
                  //    required: true,message: '用户名不能为空'
                  //  },
                  //  {
                  //   pattern: /^\w$/,message: '用户名只能包含字母、数字、下划线'
                  //  }
                  {
                    validator: this.validator
                  }
                 ]
               }
             )(
              <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
             )
           }
         
        </Form.Item>
        <Form.Item>
         
          
           {
             getFieldDecorator('password',{
               rules:[
                 {
                  validator: this.validator
                 }
               ]
             })(
              <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
             )
           }
         
        </Form.Item>
        <Form.Item>
          
        
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
         
        </Form.Item>
      </Form>
        </section>
      </div>
    )
  }
}

export default Login;