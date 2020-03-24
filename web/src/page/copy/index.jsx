import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { getQueryString,concatClass } from '@js/common.js';
import { targgerCss } from "@js/util.js";

import "@css/base.css";
import style from "./index.less";
import "./antd.normal.less";

import {
	Layout,
	Icon,
	Radio,
	Input,
	message,
	Spin,
	Select
} from 'antd';
import IconList from "@widget/iconList/index.jsx";
import PopOver from "@widget/popover/index.jsx";



const {
	Header, Content, Footer, Sider,
} = Layout;
const {Option} = Select;
const Search = Input.Search;
const TextArea = Input.TextArea;
window.message = message;

let code = getQueryString('code'),
	state = getQueryString('state');
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			library: null,
			librarys: [],
			search: getQueryString('search') || "请输入关键字，比如：smile",
			copy: getQueryString('copy') || "className",
			iconData: [],
			familys: {},
			visible: false,
			confirmLoading: false,
			updateMsg: "",
			keyword: "",
			oauthCode: code,
			username: "主人",
			showTabs: true,
			iconStyle: {},
			color: ""
		}
		this.handleEdit = this.handleEdit();
		this.handleDownLoad = this.handleDownLoad();
		this.handleSearch = this.handleSearch();
		this.handleOauth = this.handleOauth();
		this.handleSwitchChange = this.handleSwitchChange();
		this.handleSliderChange = this.handleSliderChange()
		this.handleColor = this.handleColor()
	}
	getJson() {
		let self = this;
		Axios({
			url: "http://fepublic.lizhi.fm/iconfontSource/config.json",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then((axiosRespone) => {
			if (axiosRespone.data) {
				let { familys, cssList, downloads } = axiosRespone.data,
					librarys = Object.keys(familys);
				self.setState({
					familys,
					cssList,
					librarys,
					downloads,
					library: librarys[0],
					isReady: true
				}, () => {
					if (Object.keys(cssList).length > 0) {
						self.appendCssList();
					}
				})
			}
		}).catch((err) => {
			console.log(err)
			self.setState({
				isReady: true
			})
		})
	}
	login() {
		if (code) {
			Axios({
				url: `http://192.168.0.100:8090/login?code=${code}`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				withCredentials: true
			}).then((axiosRespone) => {
				console.log(axiosRespone.data);
			}).catch((err) => {
				console.log(err)
			})
		}
	}
	getLibraryTag() {
		let { familys } = this.state,
			html = [];
		Object.keys(familys).forEach((item) => {
			html.push(<Option value={item}>{item}</Option>)
		});
		return html;
	}
	loadCss(href, cb) {
		let timer = null,
			link = document.createElement('link');
		link.href = href;
		link.rel = "stylesheet";
		link.type = "text/css";
		link.onload = () => {
			clearTimeout(timer);
			cb && cb.call && cb.call(null, true);
		}
		link.onerror = () => {
			cb && cb.call && cb.call(null, false);
		}
		timer = setTimeout(() => {
			link.onerror();
		}, 5000)
	}
	appendCssList() {
		let { cssList, library } = this.state,
			self = this,
			cssListKeys = Object.keys(cssList),
			count = cssListKeys.length;
		cssListKeys.forEach((item) => {
			targgerCss(cssList[library])
		})
	}
	handleSelectChange(key) {
		let self = this;
		return (value) => {
			self.setState({
				[key]: value
			})
		}
	}
	handleDownLoad() {
		let self = this;
		return () => {

		}
	}
	handleEdit() {
		let self = this;
		return () => {
			self.setState({
				visible: true
			})
		}
	}
	handleSearch() {
		let self = this;
		return (event) => {
			self.setState({
				keyword: event.target.value
			})
		}
	}
	handleQusetion(key) {
		let self = this;
		return () => {

		}
	}
	handleOauth() {
		let self = this;
		return () => {
			window.location.href = `http://gitlab.lizhi.fm/oauth/authorize?client_id=28568e63da11e2c4fcf03b118893fb07622503f4e50aef152932ef21579cac56&redirect_uri=http%3A%2F%2Ffepublic.lizhi.fm%2FiconfontFactory%2Findex.html&response_type=code&state=${Date.now()}`;
		}
	}
	handleSwitchChange() {
		let self = this;
		return () => {
			self.setState({
				showTabs: !self.state.showTabs
			})
		}
	}
	handleSliderChange() {
		let self = this;
		return (value) => {
			self.setState({
				iconStyle: {
					...self.state.iconStyle,
					fontSize: `${value}px`,
					lineHeight:`${value*1.5}px`,
					width:`${value*1.5}px`
				}
			})
		}
	}
	handleColor() {
		let self = this;
		return (event) => {
			let value = event.target.value,
				color = ""
			if (/^[0-9a-f]*?/.test(value)) {
				value = value.replace(/[^0-9a-f]/gi, "");
				color = value.substr(0, 6);
				self.setState({
					color,
					iconStyle: {
						...self.state.iconStyle,
						color: `#${color}`
					}
				})
			}
		}
	}
	componentDidMount() {
		this.getJson();
		this.login();
	}
	render() {
		let { library, librarys, search, copy, familys, isReady, cssList, downloads, keyword, oauthCode, username, showTabs, iconStyle, color } = this.state;
		return (
			<div className={style.page}>
				<Layout style={{ minHeight: '100vh' }}>
					<Header>
						<section className={style.slideBox}>
							<div className={`${style.module} ${style.search}`}>
								<div className={style.box}>
									<Search
										placeholder={search}
										onChange={this.handleSearch}
										style={{ width: `100%` }}
									/>
								</div>
							</div>
							<div className={style.module}>
								<div className={style.moduleTitle}>字体库<PopOver typeWrod={"library"} /></div>
								<div className={style.box}>
									{
										librarys.length > 0 ? (
											<Select style={{width:'120px'}} defaultValue={librarys[0]} buttonStyle="solid" onSelect={this.handleSelectChange('library')} >
												{
													this.getLibraryTag()
												}
											</Select>
										) : null
									}
								</div>
							</div>
							<div className={style.module}>
								<div className={style.moduleTitle}>复制<PopOver typeWrod={"copy"} /></div>
								<div className={style.box}>
									<Select style={{width:'120px'}} defaultValue={copy} onSelect={this.handleSelectChange('copy')}>
										<Option value="className">className</Option>
										<Option value="name">name</Option>
										<Option value="image">image</Option>
										<Option value="html">html</Option>
									</Select>
								</div>
							</div>
							<div className={concatClass(style.module,style.nav)}>
								<a href="./manger.html" className={style.navItem}>管理</a>
							</div>
							{/* <div className={style.module}>
								<div className={style.moduleTitle}>Update<PopOver typeWrod={"update"} /></div>
								<div className={style.box}>
									<UpdatePanel code={this.state.oauthCode} />
								</div>
							</div> */}
							{/* <div className={style.module}>
								<div className={style.moduleTitle}>Setting<PopOver typeWrod={"setting"} /></div>
								<div className={style.box}>
									<div className={style.settingItem}>
										Icon size: <Slider defaultValue={40} min={12} max={100} onChange={this.handleSliderChange} />
									</div>
									<div className={style.settingItem}>
										Show tags: <Switch size="small" checked={showTabs} onChange={this.handleSwitchChange} />
									</div>
									<div className={style.settingItem}>
										Set Color: <Input prefix="#" value={color} onChange={this.handleColor} />
									</div>
								</div>
							</div> */}
							{/* {
								cssList && library && cssList[library] ? (
									<div className={style.module}>
										<div className={style.moduleTitle}>Link<PopOver typeWrod={"link"} /></div>
										<div className={style.box} style={{ color: "#ccc", wordBreak: "break-all" }} data-library={library} data-src = {cssList[library]}>
											<Input value={`<link type="text/css" rel="stylesheet" href="${cssList ? cssList[library] : ""}" />`} />
										</div>
									</div>
								) : null
							} */}
							{/* {
								downloads && library && downloads[library] ? (
									<div className={style.module}>
										<div className={style.moduleTitle}>DownLoad(font)<PopOver typeWrod={"download"} /></div>
										<div className={style.box}>
											<a href={downloads[library]}>
												<Button type="primary" onClick={this.handleDownLoad}>
													<Icon type="download" />
													字体下载
												</Button>
											</a>
										</div>
									</div>
								) : null
							} */}
						</section>
					</Header>
					{/* <Sider
						collapsible
						collapsed={this.state.collapsed}
						onCollapse={this.onCollapse}
						width={240}
					>
						<section className={style.slideBox}>
							<div className={style.module}>
								<div className={style.moduleTitle}>Search<PopOver typeWrod={"search"} /></div>
								<div className={style.box}>
									<Search
										placeholder={search}
										onChange={this.handleSearch}
										style={{ width: `100%` }}
									/>
								</div>
							</div>
							<div className={style.module}>
								<div className={style.moduleTitle}>Library<PopOver typeWrod={"library"} /></div>
								<div className={style.box}>
									{
										librarys.length > 0 ? (
											<Radio.Group defaultValue={librarys[0]} buttonStyle="solid" onChange={this.handleSelectChange('library')} >
												{
													this.getLibraryTag()
												}
											</Radio.Group>
										) : null
									}
								</div>
							</div>
							<div className={style.module}>
								<div className={style.moduleTitle}>Copy（点击右边icon可复制）<PopOver typeWrod={"copy"} /></div>
								<div className={style.box}>
									<Radio.Group defaultValue={copy} buttonStyle="solid" onChange={this.handleSelectChange('copy')}>
										<Radio.Button value="className">Class</Radio.Button>
										<Radio.Button value="name">Name</Radio.Button>
										<Radio.Button value="image">Image</Radio.Button>
										<Radio.Button value="html">Html</Radio.Button>
									</Radio.Group>
								</div>
							</div>

							<div className={style.module}>
								<div className={style.moduleTitle}>Update<PopOver typeWrod={"update"} /></div>
								<div className={style.box}>
									<UpdatePanel code={this.state.oauthCode} />
								</div>
							</div>
							<div className={style.module}>
								<div className={style.moduleTitle}>Setting<PopOver typeWrod={"setting"} /></div>
								<div className={style.box}>
									<div className={style.settingItem}>
										Icon size: <Slider defaultValue={40} min={12} max={100} onChange={this.handleSliderChange} />
									</div>
									<div className={style.settingItem}>
										Show tags: <Switch size="small" checked={showTabs} onChange={this.handleSwitchChange} />
									</div>
									<div className={style.settingItem}>
										Set Color: <Input prefix="#" value={color} onChange={this.handleColor} />
									</div>
								</div>
							</div>
							{
								cssList && library && cssList[library] ? (
									<div className={style.module}>
										<div className={style.moduleTitle}>Link<PopOver typeWrod={"link"} /></div>
										<div className={style.box} style={{ color: "#ccc", wordBreak: "break-all" }} data-library={library} data-src = {cssList[library]}>
											<Input value={`<link type="text/css" rel="stylesheet" href="${cssList ? cssList[library] : ""}" />`} />
										</div>
									</div>
								) : null
							}
							{
								downloads && library && downloads[library] ? (
									<div className={style.module}>
										<div className={style.moduleTitle}>DownLoad(font)<PopOver typeWrod={"download"} /></div>
										<div className={style.box}>
											<a href={downloads[library]}>
												<Button type="primary" onClick={this.handleDownLoad}>
													<Icon type="download" />
													字体下载
												</Button>
											</a>
										</div>
									</div>
								) : null
							}
						</section>
					</Sider> */}
					<Layout>
						<Content>
							{
								isReady ? (
									<div className={style.content}>
										<IconList data={familys[library] || []} copyType={copy} keyword={keyword} showTabs={showTabs} iconStyle={iconStyle} />
									</div>
								) : (
										<div className={style.loading}>
											<Spin
												tip="╮(╯3╰)╭ -> Loading..."
												indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
											/>
										</div>
									)
							}
						</Content>
					</Layout>
				</Layout>
				<link rel="stylesheet" href={cssList ? cssList[library] : ""} />
			</div>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('app'))