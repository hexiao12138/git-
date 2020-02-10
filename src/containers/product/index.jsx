import React,{useMemo,useCallback,useEffect,useState} from 'react';
import {Card,Table,Input,Select, Button, message} from 'antd';

import {reqProduct} from '../../api/request';
export default function Product ({history}) {
  const {Option} = Select;
  const [productList,setProductList] = useState([]);
  const [total,setTotal] = useState(0);
  
  const products = useCallback(
    (pageNum,pageSize) => {
      reqProduct(pageNum,pageSize)
      .then(response=>{  
        setProductList(response.list)
        setTotal(response.total);
      })
      .catch(err=>{
        message.error(err)
      })
    },[]
  );
  useEffect(
    () => {
      products(1,3)
    }
   ,[products]
  );
  const addProduct = useCallback(
    () => {
      history.push('/product/add')
    },[history]
  )
  const columes = useMemo(
    () => {
      return [
        {
          title: '商品名称',
          dataIndex : 'name'
        },
        {
          title: '商品描述',
          dataIndex: 'desc'
        },
        {
          title: '价格',
          dataIndex: 'price'
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: () => {
            return(
              <div>
                <Button type='primary'>以上架</Button>
                <span>已下架</span >
              </div>
             
            )
            
          }
        },
        {
          title: '操作',
          render: () => {
            return (
              <div>
                <Button type='link'>详情</Button>
                <Button type='link'>修改</Button>
              </div>
            )
          }
        }
      ]
    },[]
  )
  return (
    <Card title={<div>
      <Select defaultValue='根据商品名称'>
        <Option value='11'>根据商品名称</Option>
        <Option value='33'>根据商品描述</Option>

      </Select>
      <Input placeholder='关键字' style={{width: 300,marginLeft: 10,marginRight: 10}}/>
      <Button type='primary'>搜索</Button>
     
    </div>} extra={ <Button type='primary' icon='plus' onClick={addProduct}>添加商品</Button>}>
      <Table 
      bordered
      columns={columes}
      dataSource={productList}
      pagination={
        {showSizeChanger: true,
          showQuickJumper:true,
          pageSizeOptions:['3','6','9','12'],
          defaultPageSize:3,
          total,
          onChange: products,
          onShowSizeChange: products
        }         
      }
      rowKey='_id'
      >
      </Table>
    </Card>
  )
}


