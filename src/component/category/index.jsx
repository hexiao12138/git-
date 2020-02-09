import React,{useMemo,useEffect,useCallback,useState ,useRef} from 'react';
import {Card ,Button,Table ,Modal,message} from 'antd';
import {connect} from 'react-redux';
import {getCategoryAsync,addCategoryAsync} from '../../redux/action';
import AddCategoryFrom from './addCategory';

 function Category ({categories,getCategoryAsync,addCategoryAsync}) {
   
   const [visible,setVisible] = useState(false);
   useEffect(
    () =>{    
      getCategoryAsync()
    },[getCategoryAsync]
  );
   //隐藏添加分类对话框
   const handleCancel= useCallback(
    () => {
      setVisible(false)
    },[]
  );
  //显示添加分类对话框
  const showCategory = useCallback(    
    () => {   
    setVisible(true)
    },[]
  );
   //添加分类数据
   
   const addCategory = useCallback(
      () => {
        addRef.current.validateFields((err,values)=>{
          if(!err){
            addCategoryAsync(values.categoryName)
            .then(()=>{
              message.success('数据添加成功');
            })
            .catch((err)=>{
              message.error(err)
            })
            addRef.current.resetFields();
            handleCancel();

          }
        })
        
      }
     
     ,[addCategoryAsync,handleCancel]
   );
   
 
  const columns = useMemo(
    ()=>{
     return [
       {
      
        title: '分类名称',
        dataIndex: 'name',
             
    } ,
    {
      title: '操作',      
      render(){
       return <div>
          <Button type='link'>
            修改分类
          </Button>
          <Button type='link'>
            删除分类
          </Button>
        </div>
      }
    }
     ]
    }
    , []);
    const addRef = useRef();
  return (    
  <Card title='分类管理' extra={<Button type='primary' icon='plus' onClick={showCategory}>添加分类</Button>}>
      <Table 
      columns={columns}
      dataSource={categories}
      bordered
      pagination={{showSizeChanger: true,showQuickJumper:true,pageSizeOptions:['3','6','9','12'],defaultPageSize:3}}
      rowKey='_id'
      />
      <Modal
          title="添加分类"
          visible={visible}
          onOk={addCategory}
          onCancel={handleCancel}
          width={300}         
        >
        <AddCategoryFrom ref={addRef}/>
        </Modal>
    </Card>
  )
}

export default connect(state => ({categories:state.getCategories}),
  {
    getCategoryAsync,
    addCategoryAsync
  }
)(Category)