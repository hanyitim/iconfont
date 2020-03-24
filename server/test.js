// const fs = require('fs');
// const cheerio = require('cheerio');
// const path = require('path');
// const $ = cheerio.load(fs.readFileSync(path.join(__dirname,'util/test/lizhifm/demo.html')));


// const encodeList = $('.unitRight.size1of2.talign-right');

// encodeList.each((index,item)=>{
//     console.log($(item).val(),index);
// })

const read = require('read-css');

read('./public/unzip/icomoon/style.css',(err,data)=>{
    console.log(data.stylesheet.rules)
})




