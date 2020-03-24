function adapter(data,option){
    let result = {};
    try{
        let getObjectVaule=function(data,keys){
            let val = data[keys.splice(0,1)[0]];
            if(keys.length >0 && Object.prototype.toString.call(val) === "[object Object]"){
                val = getObjectVaule(val,keys);
            }
            return val;
        };
        Object.keys(option).forEach((item) => {
            let keys = option[item].split(".");
            result[item] = getObjectVaule(data,keys)
        })
    }catch(e){
        //console.log(e);
    }
    return result;
}
function formatIcon(data,opt){
    let newData = adapter(data,{
        name:"properties.name",
        unicode:"properties.code",
        tags:"properties.ligatures"
    });
    // newData["className"] = `${opt.prefix ? opt.prefix : ""}${newData.name}${opt.postfix ? opt.postfix : ""}`;
    newData["className"] = `${opt.prefix ? opt.prefix : ""}${newData.name}`;
    newData["html"] =  `<i className={"${newData["className"]}"}></i>`;
    return newData;
}
function formatFontConfig(data){
    return adapter(data,{
        prefix:"imagePref.prefix",
        postfix:"imagePref.postfix",
        fontFamilyName:"fontPref.metadata.fontFamily"
    })
}

function formatFontJsonData(dataJson,encodeList){
    let result = [],
        info = {},
        data = dataJson ? JSON.parse(dataJson) : {},
        {icons:list,preferences} = data;
    if(preferences){
        info = formatFontConfig(preferences);
    }
    if(list && Array.isArray(list) && list.length > 0){
        list.forEach((item,index)=>{
            result.push({
                ...formatIcon(item,info),
                encode:encodeList[index]
            });
        })
    }
    return result;
}

function formatCss2JsonData(rules){
    let result = {
        list:[]
    };
    rules.forEach((item)=>{
        if(item.type === 'rule' && item.selectors && /\..*?before$/gi.test(item.selectors[0])){
            if(!result.prefix){
                result.prefix = `${((item.selectors[0].split('-'))[0])}`.replace(/^\./,'');
            }
            result.list.push({
                className:`${item.selectors[0]}`.replace(/:+before$/,'').replace(/^\./,''),
                content:`${item.declarations[0].value}`.replace(/[\'\"]/g,'')
            });
        }
    })
    return result;
}

module.exports={
    formatFontJsonData,
    formatCss2JsonData
}