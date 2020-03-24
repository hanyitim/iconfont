import React,{useCallback,useMemo,useContext} from 'react';
import style from './index.less';
import PropTypes from 'prop-types';
import IconItem from '@/widget/iconItem/index.jsx';
import {copyStr} from '@lizhife/copyPanel';
import Context from '@/store/context.js';
import {
	actionAppendIcon,
	actionRemoveIcon
} from '@/store/action.js';

export default function IconList({data,keyword}){
	const {globalState,globalDispatch} = useContext(Context);
	const getList = useCallback(()=>{
		let html = [];
		if(data && Array.isArray(data) && data.length > 0){
			if(keyword){
				data = data.filter((item) => {
					return `${item.className}`.indexOf(keyword) > -1;
				});
			}
			data.forEach((item,index)=>{
				let isAppend = globalState.fontmin[item.className] ? true : false;
				html.push(
					<li key={index} className={style.iconItem} >
						<IconItem data = {item} />
						<ul className={style.operation}>
							<li data-opera='copy' data-name={item.className}>复制</li>
							<li data-opera={isAppend ? 'remove' :'append'} data-name={item.className} data-json={JSON.stringify(item)}>
								{
									isAppend ? '移除' :'添加'
								}
							</li>
						</ul>
					</li>
				);
			});
		}
		return html;
	},[globalState.fontmin,data,keyword]);
	const handleOpera = useCallback((event)=>{
		let dataset = event.target.dataset,
			{opera,name,json} = dataset;
		switch(opera){
			case 'copy':
				copyStr(name).then(()=>{
					window.message.success(`${name} copied 🎉`);
				}).catch(()=>{
					window.message.error(`${name} fail`);
				});
				break;
			case 'append':
				globalDispatch(actionAppendIcon(name,JSON.parse(json)));
				break;
			case 'remove':
				globalDispatch(actionRemoveIcon(name));
				break;
		}
	},[]);
	let list = useMemo(()=>{
		return getList();
	},[data,keyword,globalState]);
	return (
		<section>
			{
				list && list.length > 0 ? (
					<ul className={style.iconList} onClick={handleOpera}>{list}</ul>
				):(
					<div className={style.nothing}>{'>_<||| 没有数据'}</div>
				)
			}
		</section>
	);
}
IconList.defaultProps = {
	data:[]
};
IconList.propTypes = {
	data:PropTypes.array,
	keyword:PropTypes.string,
	showTabs:PropTypes.bool,
	iconStyle:PropTypes.object
};