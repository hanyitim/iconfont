import React,{useEffect,useCallback,useMemo,useContext} from 'react';
import style from './index.less';

import {
	Layout,
	Table,
	Button,
	Modal,
} from 'antd';
import { 
	DeleteOutlined,
} from '@ant-design/icons';
import {
	apiLibraryDelete
} from '@/js/api.js';
import Append from '@/widget/Append/index.jsx';
import Update from '@/widget/Update/index.jsx';
import {
    actionUpdateListAsync
} from '@/store/action.js';
import Context from '@/store/context.js';
const { 
	Content ,
} = Layout;


export default function Index(){
	let {globalState,globalDispatch} = useContext(Context);
	const handleCancel = useCallback((id)=>{
		var modal = Modal.confirm({
			content:'确定删除该字体库吗？',
			okText:'确定',
			cancelText:'取消',
			onOk:()=>{
				apiLibraryDelete({id}).then(({data:res})=>{
					if(res.rcode === 0){
						window.message.success('删除成功');
						actionUpdateListAsync().then((action)=>{
							globalDispatch(action);
						});
					}else{
						window.message.error('删除失败');
					}
				});
			},
			onCancel:()=>{
				modal.destroy();
			}
		});
	},[]);
	const columns = useMemo(()=>{
		return [
			{
				title:'ID',
				dataIndex:'_id',
				key:'_id',
				width:250
			},
			{
				title:'名称',
				dataIndex:'name',
				key:'name',
				width:100
			},
			{
				title:'作者',
				dataIndex:'anthor',
				key:'anthor',
				width:100
			},
			{
				title:'创建时间',
				dataIndex:'createdAt',
				key:'createdAt',
				width:250
			},
			{
				title:'更新时间',
				dataIndex:'updatedAt',
				key:'updatedAt',
				width:250
			},
			{
				title:'操作',
				key:'action',
				// eslint-disable-next-line react/display-name
				render:(data)=>{
					return (
						<span className={style.action}>
							<span><Update data={data} /></span>
							<Button danger icon={<DeleteOutlined />} onClick={()=>{handleCancel(data._id);}}>删除</Button>
						</span>
					);
				}
			}
		];
	},[]);
	useEffect(()=>{
		actionUpdateListAsync().then((action)=>{
			globalDispatch(action);
		});
	},[]);
	return (
		<div className={style.page}>
			<Layout style={{height:'100%'}}>
				<Content className={style.content}>
					<div className={style.operation}>
						<Append />
					</div>
					<div className={style.list}>
						<Table dataSource={globalState.list} rowKey="_id"  columns={columns}>
						</Table>
					</div>
				</Content>
			</Layout>
		</div>
	);
}