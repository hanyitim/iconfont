const fs = require('fs');
const {task,series,parallel} = require('gulp');
const init = require('./gulpTask/init.js');
const unzip = require('./gulpTask/unzip.js');
const build = require('./gulpTask/build.js');
const buildJson = require('./gulpTask/buildJson.js');
const includeLess = require('./gulpTask/includeLess.js');


function getArgv(name){
    let str = (process.argv.slice(2)).join(','),
        regexp = new RegExp(`${name},(\\w+)`,'g'),
        result = regexp.exec(str);
    return result && result[1] ? result[1] : null;
}

const fontName = getArgv('fontName');
const fileName = getArgv('fileName');
const prefix = getArgv('prefix');
task('unzip',unzip(fontName));
task('init',init(fontName));
task('build',build(fontName));
task('build:fontmin',build(fontName,prefix,fileName));
task('build:json',buildJson(fontName))
task('include',includeLess(fontName,fileName));

task('append',series('unzip','build:json','init','include','build'));
task('update',series('unzip','build:json','include','build'));
task('fontmin',series('init','include','build:fontmin'))


