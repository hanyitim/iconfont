const fs = require('fs'),
      path = require('path'),
      AdmZip = require('adm-zip'),
      exec = require('child_process').exec,
      cheerio = require('cheerio');

function getRootPath(){
    return path.join(__dirname,'../');
}

function getEncodeList(content){
    const $ = cheerio.load(content),
          $encodeListDom = $('.unitRight.size1of2.talign-right');
          
    return $encodeListDom.map((index,item)=>{
        return $(item).val();
    })
}
module.exports = {
    getRootPath,
    getEncodeList
}