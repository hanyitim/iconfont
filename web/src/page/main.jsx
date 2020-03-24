import React,{useContext,useEffect} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import {
	Layout,
	message,
} from 'antd';
import Store from '@/store/index.js';
import Context from '@/store/context.js';
import {actionUpdateListAsync} from '@/store/action.js';
import '@/css/base.css';
import style from '@/page/page.less';
import '@/page/antd.normal.less';




const {
	Header, Content
} = Layout;

window.message = message;
//page
import Index from '@/page/index/index.jsx';
import Library from '@/page/library/index.jsx';
import Manger from '@/page/manger/index.jsx';

//widget
import Cheader from '@/widget/Cheader/index.jsx';

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('./service-worker.js').then(registration => {
//             console.log('SW registered: ', registration);
//         }).catch(registrationError => {
//             console.log('SW registration failed: ', registrationError);
//         });
//     });
// }
function Pages(props){
    let {match={},location={}} = props;
    let {globalDispatch} = useContext(Context);
    useEffect(()=>{
        actionUpdateListAsync().then((action)=>{
            globalDispatch(action);
        });
    },[]);
    return (
        <div className={style.page}>
            <Layout style={{ minHeight: '100vh' }}>
                <Header className={style.header}>
                    <Cheader location={location} />
                </Header>
                <Layout>
                    <Content>
                        <Route
                            path={`${match.url}/index`}
                            render={props => <Index {...props} />}
                        />
                        <Route
                            path={`${match.url}/library/:id`}
                            render={props => <Library {...props} />}
                        />
                        <Route
                            path={`${match.url}/manger`}
                            render={props => <Manger {...props} />}
                        />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}
Pages.propTypes = {
    match:PropTypes.object,
    location:PropTypes.object
};

function Main(){
    return (
        <Store>
            <Router>
                <Switch>
                    <Route exact path='/' render={() => ( <Redirect to='/pages/index' /> )}/>
                    <Route path='/pages' render={ props => <Pages {...props} /> } />
                    <Route render={() => <h1 style={{ textAlign: 'center', marginTop: '160px', color:'rgba(255, 255, 255, 0.7)' }}>页面不见了</h1>} />
                </Switch>
            </Router>
        </Store>
    );
}



const render = () =>{
    ReactDOM.render(<Main />,document.getElementById('app'));
};

if(module.hot){
    module.hot.accept('@/page/main.jsx',function(){
        render();
    });
}
render();