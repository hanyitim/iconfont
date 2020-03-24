var express = require('express');
var router = express.Router();
var unit = require('../gulpTask/_unit.js');
var fs = require('fs');
var child_process = require('child_process');
var hostConfig = 'http://localhost:8090'
router.route('').post(function(req,res){
    var {data,prefix,fontName} = req.body,
        json = JSON.stringify({prefix,list:data},{space:2}),
        fileName = `fontmin_${fontName}_${Date.now()}`,
        jsonPath = unit.pathInterim(`${fileName}.json`),
        zipPath = unit.pathZip(`${fileName}.zip`);
    try{
        fs.writeFileSync(jsonPath,json,{encoding:'utf-8'});
        child_process.execSync(`gulp fontmin --prefix ${prefix} --fontName ${fontName} --fileName ${fileName}`,{cwd:__dirname});
        res.send({rcode:0,zip:`${hostConfig}/zip/${fileName}.zip`});
    }catch(e){
        console.log(e);
        res.send({rcode:-1,e});
    }
})

module.exports = router;
