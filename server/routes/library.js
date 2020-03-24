var express = require('express');
var router = express.Router();
var Library = require('../db/models/modelsLibrary');

/* GET home page. */
router.route('/add').post(async function(req,res){
    let {name,anthor} = req.body,
        query,
        isEmpty=false,
        newLibrary;
    query = Library.findOne({name});
    await query.exec().then(function(err,item){
        if(err){
            console.log(err);
        }
        if(item){
            isEmpty = true;
        }
    })
    if(isEmpty){
        newLibrary = new Library({
            name,
            anthor
        });
        await newLibrary.save(function(err){
            if(err){
                res.send(err.msg);
            }else{
                res.json({
                    rcode:0,
                    msg:'成功'
                })
            }
        })
    }else{
        res.json({
            rcode:1,
            msg:'该库名已存在'
        })
    }
})
router.route('/update/:id').post(function(req,res){
    let data = req.body,
        {id} = req.params;
    if(!data.zip){
        res.send({
            rcode:-1,
            msg:'zip 异常'
        });
        return;
    }
    try{
        let query = Library.findByIdAndUpdate(id,data);
        query.exec().then(()=>{
            res.send({
                rcode:0
            })
        }).catch((err)=>{
            console.log(err);
            res.send({
                rcode:-1
            })
        })
    }catch(e){
        console.log(e);
    }
})
router.route('/delete').get(function(req,res){
    let {id} = req.query,
        query;
    query = Library.findByIdAndDelete(id);
    query.exec().then(function(){
        res.json({rcode:0})
    }).catch((err)=>{
        res.json({
            rcode:-1,
            err
        })
    })
})
router.route('/list').get(function(req,res){
    var query = Library.find();
    query.exec().then((list)=>{
        res.json({
            rcode:0,
            data:list
        })
    }).catch((err)=>{
        res.json({rcode:-1})
    })
})

router.route('/:id').get(function(req,res){
    var {id} = req.params,
        query = Library.findById(id);
    query.exec().then((item)=>{
        res.json({
            rcode:0,
            data:item
        });
    }).catch((err)=>{
        res.send(500,err);
    })
})
module.exports = router;
