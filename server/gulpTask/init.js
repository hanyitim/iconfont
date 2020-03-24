const {src,dest} = require('gulp');
const unit = require('./_unit.js');
module.exports = function(path){
    return function(){
        return src(unit.pathTemp('/init/*'))
        .pipe(dest(unit.pathUnzip(path)))
    }
}