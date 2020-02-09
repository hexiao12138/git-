import React,{useImperativeHandle}from 'react';
import {Form,Input} from 'antd';
import { forwardRef } from 'react';

 function AddCategoryFrom ({form:{getFieldDecorator,validateFields,resetFields}},ref) {
  useImperativeHandle(ref, () => ({
    validateFields,
    resetFields
  }));

 const {Item} = Form;
  return (
    <Form>
      <Item label='分类名称'>
         {getFieldDecorator('categoryName', {
            rules: [            
              {
                required: true,
                message: '请输入分类名称',
              },
            ],
          })(<Input placeholder='请输入分类名称'/>)}
      </Item>
     
    </Form>
  )
}
export default Form.create()(forwardRef(AddCategoryFrom));
