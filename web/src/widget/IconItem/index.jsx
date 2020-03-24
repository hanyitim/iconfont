import React from 'react';
import PropTypes from 'prop-types';
import style from './index.less';


export default function Icon({data}){
	return (
		<div className={style.wrap}>
			<div className={style.iconBox} >
				<i className={`${data.className}`}></i>
			</div>
			<div className={style.name}>{data.className}</div>
		</div>
	);
}
Icon.propTypes = {
	data:PropTypes.object,
	showTabs:PropTypes.bool
};