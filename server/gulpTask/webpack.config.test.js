const config = require('./webpack.config.js');
const unit = require('./_unit.js');

module.exports = config({
    entry:unit.pathUnzip('zhiyaapp','index.js'),
    output:{
        path:unit.pathDist('zhiyaapp'),
        filename:'index.js',
        publicPath:'./'
    }
},{
    lessGlobalVars:{
        fontName:'zhiyaapp',
        prefix:'icon'
    },
    useFontMin:true,
    zipName:'fontmin_zhiyaapp_1584964699752'
});