import React,{useMemo,useEffect,useCallback,useState ,useRef} from 'react';
import {Card ,Button,Table ,Modal,message} from 'antd';
import {connect} from 'react-redux';
import {getCategoryAsync,addCategoryAsync,updateCategoryAsync,deleteCategoryAsync} from '../../redux/action';
import AddCategoryFrom from './addCategory';

 function Category ({categories,getCategoryAsync,addCategoryAsync,updateCategoryAsync,deleteCategoryAsync}) {
   
   const [visible,setVisible] = useState(false);
   const [category,setCategory] = useState({});
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
    (category={}) => {   
    return () => {
       setVisible(true)
       setCategory(category)
    }  
    },[]
  );
   //添加或修改分类数据
   
   const addCategory = useCallback(
      () => {
       
        addRef.current.validateFields((err,values)=>{
          if(!err){    
            let promise = null;                             
            if(category.name){
            promise = updateCategoryAsync(category._id,values.categoryName)                         
            }else{
            promise = addCategoryAsync(values.categoryName) 
            }
            promise.then(()=>{
              message.success(`${category.name? '修改': '添加'}分类成功`);
            })
            .catch((err)=>{
              message.error(err)
            })
            addRef.current.resetFields();
            handleCancel();

          }
        })
        
      }
     
     ,[addCategoryAsync,handleCancel,category._id,category.name,updateCategoryAsync]
   );
   //删除分类数据
   const delCategory = useCallback(
     (category) => {
     return Modal.confirm({
        title: `您确定要删除${category.name}分类吗`,
        onOk(){
          deleteCategoryAsync(category._id)
          .then(()=>{
            message.success('删除分类成功')
          })
          .catch(err=>[
            message.errpr(err)
          ])
        }
      })
     },[deleteCategoryAsync]
   )
 
  const columns = useMemo(
    ()=>{
     return [
       {
      
        title: '分类名称',
        dataIndex: 'name',
             
    } ,
    {
      title: '操作',      
      render:  (category)=>{  
       return (
       <div>
          <Button type='link' onClick={showCategory(category)}>
            修改分类
          </Button>
          <Button type='link' onClick={delCategory(category)}>
            删除分类
          </Button>
        </div>
        )
      }
    }
     ]
    }
    , [showCategory,delCategory]);
    const addRef = useRef();
  return (    
  <Card title='分类管理' extra={<Button type='primary' icon='plus' onClick={showCategory()}>添加分类</Button>}>
      <Table 
      columns={columns}
      dataSource={categories}
      bordered
      pagination={{showSizeChanger: true,showQuickJumper:true,pageSizeOptions:['3','6','9','12'],defaultPageSize:3}}
      rowKey='_id'
      />
      <Modal
          title={category.name? '修改分类': '添加分类'}
          visible={visible}
          onOk={addCategory}
          onCancel={handleCancel}
          width={300}         
        >
        <AddCategoryFrom ref={addRef} categoryName={category.name}/>
        </Modal>
    </Card>
  )
}

export default connect(state => ({categories:state.getCategories}),
  {
    getCategoryAsync,
    addCategoryAsync,
    updateCategoryAsync,
    deleteCategoryAsync
  }
)(Category)