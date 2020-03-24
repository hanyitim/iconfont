var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
var util = require('../util/utils.js');
var child_process = require('child_process');


router.post('/', async (req, res)=>{
    let isSuccess = false,
        {file} = req,
        {name} = req.body,
        data;
    let p = new Promise((resolve)=>{
        let originalname = file.originalname,
            distPath = path.join(util.getRootPath(),`/public/zip/${name}.zip`);
        if(!fs.renameSync(file.path,distPath)){
            try{
                child_process.execSync(`gulp append --fontName ${name}`);
            }catch(err){
                if(err.error){
                    resolve(false);
                }
            }
            resolve({status:true,originalname,name});
        }else{
            resolve({status:false});
        }
    })
    await p.then(({status,originalname,name})=>{
        isSuccess = status;
        data = {
            zip:`/zip/${originalname}`,
            config:`/config/${name}/config.json`,
            source:`/source/${originalname}`,
            designConfig:`/unzip/${name}/selection.json`,
            css:`/dist/${name}/iconfont.css`,
        }
    })
    res.send({
        rcode: isSuccess ? 0 : -1,
        data
    });
});

module.exports = router;
