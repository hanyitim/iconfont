const fs = require('fs');
const unit = require('./_unit.js');
const readCss = require('read-css');
const adater = require('./_adater.js');
module.exports = function(name){
    return function(callback){
        try{
            fs.readdirSync(unit.pathPublic(`/config/${name}/`))
        }catch(e){
            fs.mkdirSync(unit.pathPublic(`/config/${name}/`));
        }
        readCss(unit.pathUnzip(name,'style.css'),(err,data)=>{
            if(err){
                throw new Error()
            }
            let rules = data.stylesheet.rules;
            fs.writeFileSync(unit.pathPublic(`/config/${name}/config.json`),JSON.stringify(adater.formatCss2JsonData(rules),{encoding:'utf-8'}));
            callback();
        })
    }
}