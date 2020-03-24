const {src,dest} = require('gulp');
const unit = require('./_unit.js');
const zip = require('gulp-zip');
module.exports = function(name){
    return function(){
        src(unit.pathUnzip(name,'/fonts/*.*'))
        .pipe(zip(`${name}.zip`))
        .pipe(dest(unit.pathPublic(`source/`)))
    }
}