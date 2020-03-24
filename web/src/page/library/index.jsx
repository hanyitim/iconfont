import React,{useEffect,useCallback,useState,useContext} from 'react';
import PropTypes from 'prop-types';
import style from './index.less';
import {apiLibraryById,apiGetConfig,apiFontmin} from '@/js/api.js';
import {
	Spin,
	Input,
	Button,
	Badge
} from 'antd';
import { 
	LoadingOutlined,
	DownloadOutlined
} from '@ant-design/icons';
import {
	actionClearIcon,
} from '@/store/action.js';
import Context from '@/store/context.js';
import IconList from '@/widget/IconList/index.jsx';

function getFontminData(obj){
	let result = [];
	for(let key in obj){
		result.push(obj[key]);
	}
	return result;
}
export default function Library({match}){
	let [data,setData] = useState({}),
		[config,setConfig] = useState([]),
		[keyword,setKeyword] = useState(''),
		[prefix,setPrefix] = useState(''),
		[loading,setloading] = useState(true),
		{globalState,globalDispatch} = useContext(Context);
	const getData = useCallback(()=>{
		apiLibraryById({},match.params.id).then(({data:res})=>{
			if(res.rcode === 0){
				setData(res.data);
				getConfig(res.data.config);
			}
		});
	},[]);
	const getConfig = useCallback((url)=>{
		apiGetConfig({},url).then(({data})=>{
			setConfig(data.list);
			setPrefix(data.prefix);
			setloading(false);
		});
	},[]);
	const laodCss = useCallback((url)=>{
		let link = document.getElementById('link');
		if(!link){
			link = document.createElement('link');
			link.id = 'link';
			link.rel = 'stylesheet';
			link.type = 'text/css';
		}
		link.href = url;
		document.head.append(link);
	},[]);
	const handleSearch = useCallback((event)=>{
		let value = event.target.value;
		console.log(value);
		setKeyword(value);
	},[]);
	const handleCreateFontmin = useCallback(()=>{
		setloading(true);
		apiFontmin({
			data:getFontminData(globalState.fontmin),
			prefix:prefix,
			fontName:data.name
		}).then(({data:res})=>{
			if(res.rcode === 0){
				window.open(res.zip);
				globalDispatch(actionClearIcon());
			}else{
				throw new Error(JSON.stringify(res));
			}
			setloading(false);
		}).catch((err)=>{
			setloading(false);
			window.message.fail(err.msg);
		});
	},[globalState.fontmin,data,prefix]);
	useEffect(()=>{
		if(match.params.id){
			getData();
		}
		return ()=>{
			globalDispatch(actionClearIcon());
		};
	},[match.params.id]);
	useEffect(()=>{
		if(data.css){
			laodCss(data.css);
		}
	},[data]);
	return (
		<div className={style.page}>
			<Spin
				tip="╮(╯3╰)╭ -> Loading..."
				spinning={loading}
				indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
			>
				<div className={style.operation}>
					<div className={style.search}>
						<Input 
							placeholder='搜索className'
							onChange={handleSearch}
							style={{width:400}}
							value={keyword}
						/>
					</div>
					<div className={style.btn}>
						<Badge count={globalState.fontminIconCount} onClick={handleCreateFontmin}>
							<Button type={'primary'}>生成字体</Button>
						</Badge>
					</div>
					<div className={style.btn}><Button type={'link'} href={data.zip} icon={<DownloadOutlined />}>字体包</Button></div>
				</div>
				<div className={style.content}>
					<IconList data={config} keyword={keyword}  />
				</div>
			</Spin>
		</div>
	);
}
Library.propTypes = {
	match:PropTypes.any
};