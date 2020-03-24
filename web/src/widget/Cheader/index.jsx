import React,{useContext,useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import style from './index.less';
import Context from '@/store/context.js';
import {NavLink} from 'react-router-dom';
import {Menu} from 'antd';

const { SubMenu } = Menu;


export default function Cheader({location}){
    let {globalState} = useContext(Context);
    let [selectedKey,setSelectedKey] = useState(['1']);
    useEffect(()=>{
        let cancheKey = '1';
        if(location.pathname.indexOf('index') > -1){
            cancheKey = '1';
        }
        else if(location.pathname.indexOf('manger') > -1){
            cancheKey = '2';
        }else{
            cancheKey = '';
        }
        setSelectedKey([cancheKey]);
    },[location]);
    return (
        <div className={style.wrap}>
            <div className={style.logo}>
                iconfont
            </div>
            <Menu
                theme='dark'
                mode='horizontal'
                style={{lineHeight:'64px'}}
                selectedKeys={selectedKey}
            >
                <Menu.Item key='1'>
                    <NavLink to="/pages/index">
                        首页
                    </NavLink>
                </Menu.Item>
                <SubMenu title='字体库'>
                    {
                        globalState.list.map((item)=>{
                            return (
                                <Menu.Item key={item._id}>
                                    <NavLink to={`/pages/library/${item._id}`}>
                                        {item.name}
                                    </NavLink>
                                </Menu.Item>
                            );
                        })
                    }
                </SubMenu>
                <Menu.Item key='2'>
                    <NavLink to="/pages/manger">
                        管理
                    </NavLink>
                </Menu.Item>
            </Menu>
        </div>
    );
}
Cheader.propTypes={
    location:PropTypes.object
};