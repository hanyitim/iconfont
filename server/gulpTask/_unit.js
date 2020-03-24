const path = require('path');
// const pwd = process.cwd();

function pathUnzip(){
    let _join = path.join.bind(null,__dirname,'../','public/unzip');
    return _join.apply(null,arguments);
}

function pathDist(){
    let _join = path.join.bind(null,__dirname,'../','public/dist');
    return _join.apply(null,arguments);
}

function pathZip(){
    let _join = path.join.bind(null,__dirname,'../','public/zip');
    return _join.apply(null,arguments);
}

function pathTemp(){
    let _join = path.join.bind(null,__dirname,'../','public/temp');
    return _join.apply(null,arguments);
}

function pathPublic(){
    let _join = path.join.bind(null,__dirname,'../','public');
    return _join.apply(null,arguments);
}

function pathInterim(){
    let _join = path.join.bind(null,__dirname,'../','public/interim');
    return _join.apply(null,arguments);
}

module.exports = {
    pathUnzip,
    pathDist,
    pathTemp,
    pathZip,
    pathPublic,
    pathInterim
}