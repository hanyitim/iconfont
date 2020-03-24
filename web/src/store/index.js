import React,{useReducer} from 'react';
import PropTypes from 'prop-types';
import {initnalState,reducer} from './reducer.js';
import Context from './context.js';

function Store(props){
    let [globalState,globalDispatch] = useReducer(reducer,initnalState);
    return (
        <Context.Provider value={{globalState,globalDispatch}}>
            {props.children}
        </Context.Provider>
    );
}
Store.propTypes ={
    children:PropTypes.any
};
export default Store;