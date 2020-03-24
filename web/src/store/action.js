import * as Types from './types.js';
import {apiLibraryList} from '@/js/api.js';

export function updateList(data=[]){
    return {
        type:Types.UPDATE_LIST,
        data
    };
}

export async function actionUpdateListAsync(){
    let data = [];
    await apiLibraryList({}).then(({data:res})=>{
        if(res.rcode === 0){
            data = res.data;
        }
    });
    return {
        type:Types.UPDATE_LIST,
        data
    };
}

export function actionOperationStatus(status){
    return {
        type:Types.OPEARTION_STATUS,
        data:{
            status
        }
    };
}

export function actionAppendIcon(name,data){
    return {
        type:Types.APPEND_ICON,
        data:{
            name,
            data
        }
    };
}

export function actionRemoveIcon(name){
    return {
        type:Types.REMOVE_ICON,
        data:{
            name
        }
    };
}

export function actionClearIcon(){
    return {
        type:Types.CLEAR_ICON
    };
}