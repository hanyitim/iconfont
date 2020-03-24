const unit = require('./_unit.js');
const webpack = require('webpack');
const config = require('./webpack.config.js');
module.exports = function(name,prefix,fileName){
    return function(callback){
        webpack(config({
            entry:unit.pathUnzip(name,'index.js'),
            output:{
                path: fileName ? unit.pathDist(name,fileName) : unit.pathDist(name),
                filename:'index.js',
                publicPath:'./'
            }
        },{
            lessGlobalVars:{
                fontName:name,
                prefix
            },
            useFontMin:true,
            zipName:fileName
        }),function(err,stat){
            // console.log(err,stat);
            callback();
        })
    }
}