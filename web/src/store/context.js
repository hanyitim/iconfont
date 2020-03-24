import React from 'react';

const defaultContext = {
    globalState:{},
    globalDispatch:()=>{
    }
};
const Context = React.createContext(defaultContext);

export default Context;