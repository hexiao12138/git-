import React ,{useCallback}from 'react';
import { Form, Icon, Input, Button ,message} from 'antd';
import {connect} from 'react-redux';
import {saveUserAsync} from '../../redux/action';
import logo from '../../assets/imgs/logo.png';
import './index.less';
import withCheckLogin from '../../containers/with-check-login';
 function Login({
   form:{getFieldDecorator,validateFields,resetFields },
   history,
   saveUserAsync
 }) {
   //自定义表单校验
   const validator = useCallback((rule, value, callback)=>{
      const reg = /^\w+$/;
      const name = rule.field === 'username' ? '用户名': '密码';
      if(!value){
        callback(`${name}不能为空`)
      }else if(value.length < 4){
        callback(`${name}的长度不能小于4位`)
      }else if(value.length > 10){
        callback(`${name}的长度不能大于10位`)
      }else if (!reg.test(value)){
        callback('用户名只能包含字母,数字,下划线')
      }
      callback();
   },[]);


   //提交表单
   const login = useCallback(
     e =>{
       e.preventDefault();
      //验证表单,收集表单数据
      validateFields((err,values)=>{
        if(!err){
          //表单校验成功
          const {username,password} = values;         
            saveUserAsync(username,password)
            .then(()=>{
              history.replace('/');             
            })
            .catch(errMsg=>{
              message.error(errMsg);
              resetFields(['password']);
            })
        }
        
      })
   },[validateFields,resetFields,history,saveUserAsync])
  return (
    
    <div className='login'>
      <header>
        <img src={logo} alt=""/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section>
        <h1>用户登录</h1>
      <Form  className="login-form" onSubmit={login}>
        <Form.Item className='form'>
          {
            getFieldDecorator('username', {
              rules: [{ 
                validator: validator
               } ,
            ],
            })(
              <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
              className='input'
            />
            )
          }
            
         
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', {
              rules: [
                {
                  validator: validator
                }
           ],
            })(
              <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
              className='input'
            />
            )
          }
            
          
        </Form.Item>
        <Form.Item>
         
          <Button type="primary" htmlType="submit" className="button">
            登录
          </Button>
       
        </Form.Item>
      </Form>
      </section>
    </div>
  )
}
export default withCheckLogin(
  connect(null,{
  saveUserAsync
})(Form.create()(Login)));