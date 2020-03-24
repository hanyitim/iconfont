import React,{useState,useCallback,useContext} from 'react';
import PropTypes from 'prop-types';
import style from './index.less';
import {
    Modal,
    Button,
    Form,
    Input,
    Upload,
    Spin,
    Alert
} from 'antd';
import { 
    UploadOutlined,
    EditOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import {
    apiLibraryUpdate
} from '@/js/api.js';
import Context from '@/store/context.js';
import {
    actionUpdateListAsync
} from '@/store/action.js';


export default function Update({data}){
    let [visible,setVisible] = useState(false),
        [confirmLoading,setConfirmLoading] = useState(false),
        [spinning,setSpinning] = useState(false),
        [uploadData,setUploadData] = useState({});
    const {globalDispatch} = useContext(Context);
    const [form] = Form.useForm();
    const initData = useCallback(()=>{
        setVisible(false);
        setConfirmLoading(false);
        setSpinning(false);
        setUploadData({});
    },[]);
    const handleOk = useCallback(()=>{
        if(uploadData.zip){
            setConfirmLoading(true);
            form.submit();
        }else{
            window.message.error('请先上传字体包');
        }
    },[uploadData]);
    const handleCancel = useCallback(()=>{
        setVisible(false);
    },[]);
    const handleClick = useCallback(()=>{
        setVisible(true);
    },[]);
    const handleFinish = useCallback((values)=>{
        setSpinning(true);
        apiLibraryUpdate({...values,...uploadData},data._id).then(({data:res})=>{
            console.log(res);
            if(res.rcode === 0){
                window.message.success('更新成功');
                // setVisible(false);
                actionUpdateListAsync().then((action)=>{
                    globalDispatch(action);
                });
                initData();
            }else{
                window.message.error('更新失败');
            }
        }).finally(()=>{
            setSpinning(false);
            setConfirmLoading(false);
        });
    },[uploadData]);
    const handleBeforeUpload = useCallback((file)=>{
        const isZIP = file.type === 'application/zip';
        if(!isZIP){
            // window.message.error(MSG_ERROR_NOT_ZIP)
            window.message.error('文件必须是zip');
        }else{
            setSpinning(true);
        }
        return isZIP;
    },[]);
    const handleChange = useCallback(({file})=>{
        if(file && file.status == 'done'){
            setSpinning(false);
            let res = file.response;
            if(res.rcode == 0){
                setUploadData(res.data);
                window.message.success('上传成功');
            }else{
                window.message.error('上传失败，请重新上传');
            }
        }
    },[]);
    return (
        <div className={style.wrap}>
            <Button type='primary' onClick={handleClick} icon={<EditOutlined />}>更新</Button>
            <Form 
                name={data._id}
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
                    title='更新'
                    visible={visible}
                    onOk={handleOk}
                    // confirmLoading={confirmLoading}
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
                    <Spin spinning={spinning} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip='loading'>
                        <Form.Item
                            label='字体库名称'
                        >
                            <Input defaultValue={data.name} disabled />
                        </Form.Item>
                        <Form.Item
                            label='zip'
                        >
                            <Upload
                                name="zip"
                                action={'http://localhost:8090/upload'}
                                headers={{
                                    'authorization':'authorization-text',
                                    'X-Requested-With':null,
                                }}
                                data={{
                                    name:data.name
                                }}
                                beforeUpload={handleBeforeUpload}
                                showUploadList={false}
                                onChange={handleChange}
                                withCredentials={true}
                            >
                                <Button icon={<UploadOutlined />}>
                                    上传字体包
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label='更新说明'
                            name='note'
                        >
                            <Input />
                        </Form.Item>
                        <Alert 
                            message="zip包的包名需要与字体库名称保持一致" 
                            type='info'
                        />
                    </Spin>
                </Modal>
            </Form>
        </div>
    );
}
Update.propTypes = {
    data:PropTypes.object
};