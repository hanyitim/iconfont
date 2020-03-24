import * as Types from './types.js';

export const initnalState = {
    list:[],
    fontmin:{},
    fontminIconCount:0,
    operationStatus:false
};
export function reducer(state,action){
    switch(action.type){
        case Types.UPDATE_LIST:
            if(action.data){
                state.list = action.data;
            }
            return {
                ...state
            };
        case Types.OPEARTION_STATUS:
            state.operationStatus = action.data.operationStatus || false;
            return {
                ...state
            };
        case Types.APPEND_ICON:
            if(action.data.name && action.data.data){
                state.fontmin[action.data.name] = action.data.data;
                state.fontminIconCount++;
            }
            return {
                ...state
            };
        case Types.REMOVE_ICON:
            if(action.data.name && state.fontmin[action.data.name]){
                delete state.fontmin[action.data.name];
                state.fontminIconCount--;
            }
            return {
                ...state
            };
        case Types.CLEAR_ICON:
            state.fontmin = {};
            state.fontminIconCount=0;
            return {
                ...state
            };
    }
}