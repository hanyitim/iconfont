const {src,dest} = require('gulp');
const unit = require('./_unit.js');
const inject = require('gulp-inject-string');
const fs = require('fs');
module.exports = function(fontName,fileName){
    var lessRules = [];
    var fileContent = "",
        content = {},
        selectIcon = [];
    try{
        fileContent = fs.readFileSync(fileName ? unit.pathInterim(`${fileName}.json`) :unit.pathPublic('config',fontName,'config.json'),{encoding:'utf-8'});
        content = JSON.parse(fileContent);
        selectIcon = content.list;
    }catch(e){
        console.log(e);
    }
    Array.isArray(selectIcon) && selectIcon.forEach((item)=>{
        lessRules.push(`.${item.className}{.icon("${item.content}")}`);
    });
    return function(){
        return src(unit.pathUnzip(fontName,'/index.less'))
        .pipe(inject.append(lessRules.join('\n')))
        .pipe(dest(unit.pathUnzip(fontName)))
    }
}