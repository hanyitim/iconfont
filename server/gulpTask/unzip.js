const {src,dest} = require('gulp');
const unit = require('./_unit.js');
const unzip = require('gulp-unzip');
module.exports = function(name){
    return function(){
        return src(unit.pathZip(`${name}.zip`))
        .pipe(unzip())
        .pipe(dest(unit.pathUnzip(name)))
    }
}