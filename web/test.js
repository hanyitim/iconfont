
const data = require('./data.js')
const _ = require('underscore');

let createOrderCount = 0
let createOrder = []
let warn = []
let error = [];
let isPay = []
let isPaySuccessCount = 0;
let test = []
let ctest = []
let visitility = 0;
let hidden = 0;
data.forEach((item)=>{
    item.metaData.forEach((childItem,index)=>{
        if(childItem.name === 'createOrder'){
            createOrderCount++;
            ctest.push(childItem);
            createOrder.push(item.metaData.slice(index-2,5))
            //连续crateOrder
            let nextChildItem = item.metaData[index +1];
            if(nextChildItem && nextChildItem.name === 'createOrder'){
                warn.push([childItem,item.metaData[index+1]]);
                if(nextChildItem.timeStamp - childItem.timeStamp < 3000){
                    error.push([childItem,item.metaData[index+1]]);
                }
            }
            //连贯
            if(nextChildItem && (
                // nextChildItem.name === 'usreInfo' ||
                // nextChildItem.name === 'isPay' 
                nextChildItem.name === 'visibilitychange'
            )){
                if((item.metaData.slice(index,6)).length > 0){
                    test.push(item.metaData.slice(index,6));
                }
                
            }
        }
        else if (childItem.name === 'isPay'){
            isPay.push(childItem);
            if(childItem.reportData.isPay === 1){
                isPaySuccessCount++;
            }
        }
        else if (childItem.name === 'visibilitychange'){
            visitility++;
            if(childItem.reportData === 'hidden'){
                hidden++;
            }
        }
    })
});
// console.log('createOrderCount',createOrderCount)
// var t = ctest.map((item)=>{
//     return item.reportData.orderId;
// })
// console.log(t.length);
// var tt = new Set(t);
// console.log(tt.size);

// console.log('isPaySuccessCount',isPaySuccessCount)
// console.log('isPay',isPay.length)
// console.log('createOrder',createOrder)
// console.log('warn',warn)
console.log('error',error.length)
// console.log('test',JSON.stringify(test))
// console.log(visitility,'visitility')
// console.log(hidden,'hidden')
