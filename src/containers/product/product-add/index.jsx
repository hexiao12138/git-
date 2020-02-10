import React,{useState,useCallback} from 'react';
import {Card,Icon,Form,Input, Select,InputNumber, Button } from 'antd';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import './index.less';
 function AddProduct ({form:{getFieldDecorator}}) {
  
  const {Item} = Form;
  const [editorState,setEditorState] = useState(BraftEditor.createEditorState(null));
  const handleChange = useCallback(
    (editorState) => {
      setEditorState({ editorState })
    },[]
  )
  return (
    <Card title={
    <div>
      <Icon type="arrow-left" style={{paddingRight: 10}}/><span >添加商品</span>
    </div>
    }>
    <Form labelCol={{span: 3}} wrapperCol={{span: 10}}>
      <Item label='商品名称'>       
       {
         getFieldDecorator(
           'productName',
          {
            rules: [
              {
                required: true,
              message: '请输入商品名称',
              }
              
            ]
          }
         )(
           <Input placeholder='请输入商品名称' />
         )
       }
      </Item>
      <Item label='商品描述'>       
       {
         getFieldDecorator(
           'productDesc',
          {
            rules: [
              {
                required: true,
              message: '请输入商品描述',
              }
              
            ]
          }
         )(
           <Input placeholder='请输入商品描述' />
         )
       }
      </Item>
      <Item label='商品分类'>       
      {
         getFieldDecorator(
           'productCategory',
          {
            rules: [
              {
                required: true,
               
              }
              
            ]
          }
         )(
           <Select>

           </Select>
         )
       }
      </Item>
      <Item label='商品价格'>       
       {
         getFieldDecorator(
           'productPrice',
          {
            rules: [
              {
                required: true,
                message: '请输入商品价格'
              }
              
            ]
          }
         )(
           <InputNumber 
           formatter={value =>
            `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          
          parser={value => value.replace(/￥\s?|(,*)/g, '')}/>
         )
       }
      </Item>
      <Item label='商品详情' wrapperCol={{span: 20}}>       
      {
         getFieldDecorator(
           'productDetails',
          {
            rules: [
              {
                required: true,
               message: '请输入商品详情'
              }
              
            ]
          }
         )(
          <BraftEditor className='editor' placeholder='请输入商品描述'  />
         )
       }
      </Item>
    </Form>
    <Button type='primary'>提交</Button>
    </Card>
  )
}
export default Form.create()(AddProduct);