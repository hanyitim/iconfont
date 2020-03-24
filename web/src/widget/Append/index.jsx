import React,{useState,useCallback,useContext} from 'react';
import style from './index.less';
import {apiLibraryAdd} from '@/js/api.js';
import {
    Modal,
    Button,
    Form,
    Input
} from 'antd';
import { 
	PlusOutlined
} from '@ant-design/icons';
import {
    actionUpdateListAsync
} from '@/store/action.js';
import Context from '@/store/context.js';
export default function Append(){
    let [visible,setVisible] = useState(false),
        [confirmLoading,setConfirmLoading] = useState(false),
        {globalDispatch} = useContext(Context);
    const [form] = Form.useForm();
    const handleOk = useCallback(()=>{
        setConfirmLoading(true);
        form.submit();
    },[]);
    const handleCancel = useCallback(()=>{
        setVisible(false);
    },[]);
    const handleClick = useCallback(()=>{
        setVisible(true);
    },[]);
    const handleFinish = useCallback((values)=>{
        console.log(values);
        if(!values.name){
            window.message.warning('请输入字体库名称');
            setConfirmLoading(false);
            return false;
        }
        apiLibraryAdd(values).then(({data:res})=>{
            console.log(res);
            if(res.rcode === 0){
                actionUpdateListAsync().then((action)=>{
                    globalDispatch(action);
                    setVisible(false);
                });
            }else{
                window.message.error(res.msg);
            }
            setConfirmLoading(false);
        }).catch((err)=>{
            window.message.error(err);
            setConfirmLoading(false);
        });
    },[]);
    return (
        <div className={style.wrap}>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleClick}>新增字体</Button>
            <Form 
                name='append'
                onFinish={handleFinish}
                form={form}
                layout={
                    {
                        labelCol:{span:16},
                        wrapperCol:{span:16}
                    }
                }
            >
                <Modal
                    title='新增'
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key='back' onClick={handleCancel}>
                            取消
                        </Button>,
                        <Button key='submit' type='primary' htmlType='submit' loading={confirmLoading} onClick={handleOk}>
                            确认
                        </Button>
                    ]}
                >
                    
                    <Form.Item
                        label='字体库名称'
                        name='name'
                        required={true}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='作者'
                        name="anthor"
                    >
                        <Input />
                    </Form.Item>
                </Modal>
            </Form>
        </div>
    );
}