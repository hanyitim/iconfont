import React from 'react';
import style from './index.less';
import ReactMardown from 'react-markdown';

import description from './readme.md';

export default function Index(){
	return (
		<div className={style.page}>
			<div>
				<ReactMardown source={description} />
			</div>
		</div>
	);
}