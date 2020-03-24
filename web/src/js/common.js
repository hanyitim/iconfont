/**
 *
 *
 *
 * 
 */
export function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (decodeURIComponent(r[2])); return null; 
}
export function setQueryString(opt = {}){
    let result = (Object.keys(opt)).map((item) => {
        return `${item}=${opt[item] ? encodeURIComponent(JSON.stringify(opt[item]).replace(/[\"\']/gi,"")) : ""}`; 
    })
    return result.join("&").replace(/[\"\']/gi,"");
}
export function ObjectHasAttr(obj) {
    if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
        obj = {};
    }
    var len = 0;
    if (Object.keys) {
        len = (Object.keys(obj)).length;
    } else {
        for (key in obj) {
            len++;
        }
    }
    return len > 0;
}
export function isEmtryObject(obj) {
    if (!obj || !testTypeFactory('object')(obj)) {
        obj = {};
    }
    for (key in obj) {
        return false;
    }
    return true
}
function testTypeFactory(typename) {
    if (!typename || typeof typename !== 'string') {
        return false;
    };
    typename = typename.toLocaleLowerCase().replace(/^\w/, function (arg) { return arg.toLocaleUpperCase(); });
    return function (arg) {
        return Object.prototype.toString.call(arg) == '[object ' + typename + ']';
    }
}
export function isFunction(arg) {
    return typeof arg == 'function';
}
export function isArray(arg) {
    return testTypeFactory('Array')(arg);
}
export function isObject(arg) {
    return testTypeFactory('Object')(arg);
}
export function support(cssName) {
    var htmlStyle = document.documentElement.style;
    if (cssName in htmlStyle)
        return true;
    return false;
}
function compter(second, utils) {
    let arr = [];
    arr.push(parseInt(second / utils[0]))
    let num = second % utils[0];
    if (num >= 0 && utils.slice(1).length > 0) {
        arr.push(compter(num, utils.slice(1)))
    }
    return arr.join(" ");
}
function endTime(time) {
    var now, time_diff, opt, str;
    if (isNaN(time) || !time) {
        log("arguments err");
        return false;
    }
    now = (new Date()).getTime();
    time_diff = parseInt((time - now) / 1000);
    var utils = [24 * 60 * 60, 60 * 60, 60, 1];
    if (time_diff) {
        opt = (compter(time_diff, utils)).split(" ");
        if (opt[0] > 0) {
            str = opt[0] + '天';
            if (opt[1] > 0) {
                str += opt[1] + '小时';
            }
        }
        else if (opt[1] > 0) {
            str = opt[1] + '小时';
            if (opt[2] > 0) {
                str += opt[2] + '分钟';
            }
        }
        else if (opt[2] > 0) {
            str = opt[2] + '分钟';
        }
        else if (opt[3] > 0) {
            str = '1分钟';
        }
    }
    return [opt, str];
}
export let support_css3 = (function () {
    var div = document.createElement('div'),
        vendors = 'Ms O Moz Webkit'.split(' '),
        len = vendors.length;
    return function (prop) {
        if (prop in div.style) return true;
        prop = prop.replace(/^[a-z]/, function (val) {
            return val.toUpperCase();
        });
        while (len--) {
            if (vendors[len] + prop in div.style) {
                return true;
            }
        }
        return false;
    };
})();
// window.debug = getQueryString("debug") || getCookie('debug');
window.debug = getQueryString("debug") || false;
export function log() {
    var arr = Array.prototype.slice.call(arguments);
    for (var i = 0; i < arr.length; i++) {
        if (!isFunction(arr[i])) {
            arr[i] = JSON.stringify(arr[i]);
        }
    }
    if (window.debug) {
        alert(arr.join('-----------------------------------\n'));
    } else {
        //console.log(arr.join('-----------------------------------\n'));
    }
}
export function setCookie(name, value, day) {
    var exp = new Date();
    var day = !isNaN(day) ? day : 1;
    exp.setTime(exp.getTime() + day * 60 * 60 * 1000);//有效期1小时 
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
export function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null)
        return unescape(arr[2]);
    return null;
}
export function deleteCookie(name, ) {
    setCookie(name, '', -1);
}
export function getSundayDate() {
    var now, date, day, month, year, dayTime, todayTime, sundayTime, h, m, s;
    now = new Date();
    dayTime = 24 * 60 * 60 * 1000;
    month = now.getMonth() + 1;
    year = now.getYear() + 1900;
    date = now.getDate();
    day = now.getDay();
    todayTime = new Date(`${month}/${date}/${year}`).getTime();
    sundayTime = todayTime + (7 - day) * dayTime;
    return new Date(sundayTime);
}
export function getMondayDate() {
    var now, date, day, month, year, dayTime, todayTime, mondayTime, h, m, s;
    now = new Date();
    dayTime = 24 * 60 * 60 * 1000;
    month = now.getMonth() + 1;
    year = now.getYear() + 1900;
    date = now.getDate();
    day = now.getDay();
    todayTime = new Date(`${month}/${date}/${year}`).getTime();
    mondayTime = day > 0 ? todayTime + (7 - (day - 1)) * dayTime : todayTime + dayTime;
    return new Date(mondayTime);
}
export function countDown(time, callback) {
    var now = new Date();
    var result = "";
    if (!time || time <= now.getTime()) {
        result = [0, 0, 0, 0].join(" ");
    } else {
        var utils = [24 * 60 * 60, 60 * 60, 60, 1];
        var time_diff = parseInt((time - now.getTime()) / 1000);
        result = compter(time_diff, utils);
    }
    callback && callback.call && callback.call(this, result);
}
export function GetTime(str, format) {
    str = parseInt(str);
    var D = false;
    if (isNaN(str)) {
        D = new Date();
    }
    else {
        D = new Date(str);
    }
    var ret = "";
    if (D && !isNaN(D.getTime())) {
        var fullyear = D.getFullYear();
        var month = D.getMonth() + 1;
        var date = D.getDate();
        var hours = D.getHours();
        var minute = D.getMinutes();
        var second = D.getSeconds();
        var doublemonth = month > 9 ? month : "0" + month;
        var doubledate = date > 9 ? date : "0" + date;
        var doubleyear = fullyear.toString().substr(2);
        var doublehours = hours > 9 ? hours : "0" + hours;
        var doubleminues = minute > 9 ? minute : "0" + minute;
        var doublesecond = second > 9 ? second : "0" + second;
        ret = format;
        ret = ret.replace(/YYYY/g, fullyear);
        ret = ret.replace(/YY/g, doubleyear);
        ret = ret.replace(/mm/g, doublemonth);
        ret = ret.replace(/m/g, month);
        ret = ret.replace(/dd/g, doubledate);
        ret = ret.replace(/d/g, date);
        ret = ret.replace(/hh/g, doublehours);
        ret = ret.replace(/h/g, hours);
        ret = ret.replace(/ii/g, doubleminues);
        ret = ret.replace(/i/g, minute);
        ret = ret.replace(/ss/g, doublesecond);
        ret = ret.replace(/s/g, second);
    }
    return ret;
}
export function transformImageSize(size, imgsrc) {
    let reg = /(.*?)\/([\w\d]*?)(\_?(\d*?)x\d*?)?\.(jpg|png|gif|jpeg)$/gi;
    let arr = reg.exec(imgsrc) || [];
    if (imgsrc && typeof imgsrc == "string" && !isNaN(size) && size >= 0 && arr.length > 0) {
        let info = {
            address: arr[1],
            name: arr[2],
            size: arr[4] || 0,
            type: arr[5]
        }
        if (info.address && info.name && info.type && size !== info.size) {
            if (size == 0) {
                imgsrc = `${info.address}/${info.name + info.type}`;
            }
            else {
                imgsrc = `${info.address}/${info.name}_${size}x${size}.${info.type}`;
            }
        }
    }
    return imgsrc;
}
var once = false;
export function addDebug() {
    var body = document.body,
        timer = null;
    if (!once) {
        once = true;
        body.addEventListener("touchstart", function (event) {
            timer = setTimeout(function () {
                window.debug = !window.debug;
                if (window.debug) {
                    setCookie('debug', window.debug);
                    alert('debug:true');
                } else {
                    deleteCookie('debug');
                    alert('debug:false');
                }
            }, 5000);
        }, false);
        body.addEventListener('touchend', function (event) {
            clearTimeout(timer);
        })
    }
}
export function testLog(el, str) {
    var p = document.createElement('p');
    p.textContent = str;
    el.appendChild(p);
}
export var diffTime = (() => {
    let time = Date.now();
    return (label) => {
        let now = Date.now(),
            diffTime = now - time;
        console.info(`${label} diffTime:`, `${diffTime}ms`);
        time = now;
    }
})();
//识别当前环境
export function getRelesestage() {
    let result = null,
        link = window.location.href.toLocaleLowerCase();
    if (link.indexOf('office') !== -1 || link.indexOf('test') !== -1) {
        result = "development"
    }
    else if (link.indexOf('pre') !== -1) {
        result = "pre_product"
    }
    else if (/^https?:\/\/(\d+\.){3}/i.test(link) || /localhost/i.test(link)) {
        result = "localhost";
    }
    else {
        result = "product"
    }
    return result;
}
export function concatClass(){
    return Array.prototype.join.call(arguments," ");
}

export function Browser(){
    var ua = decodeURIComponent(window.navigator.userAgent.toLocaleLowerCase()),
        result=null,
        isIos,
        isAndroid,
        isIpad,
        isIphone,
        isWeixin,
        isUc,
        isWeibo,
        isLizhi;

    isIos = ()=>{ return /mac\s+os\s+x/gi.test(ua); };
    isAndroid = () => { return  /android/gi.test(ua); };
    isIphone = () => { return  /iphone/gi.test(ua); };
    isIpad = () => { return  /ipad/gi.test(ua); };
    isLizhi = () => { return  /lizhi/gi.test(ua); };
    isWeixin = () => { return  /micromessenger/gi.test(ua); };
    isWeibo = () => { return  /weibo/gi.test(ua); };
    isUc = () => { return  /ucbrowser/gi.test(ua); };

    return {
        isIos,
        isAndroid,
        isIphone,
        isIpad,
        isLizhi,
        isWeixin,
        isUc,
        isWeibo
    }
}
//距离第N天，倒计时
export function getEndTimestamp(days,maxDate){
    let now = new Date(),
        todayDateStr = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}`,
        daysTimestamp = (new Date(todayDateStr)).getTime() + 1000*60*60*24*days,
        maxEndTimestamp = maxDate ? (new Date(maxDate)).getTime() : 0;
    return maxEndTimestamp && daysTimestamp > maxEndTimestamp ? 0 : (daysTimestamp - now.getTime());
}
//获取当前对象日月年
function getDate(d){
    let month = d.getMonth()+1,
        year = d.getFullYear(),
        day = d.getDate();
    if(month <10){
        month = `0${month}`;
    }
    if(day <10){
        day = `0${day}`;
    }
    return `${year}/${month}/${day}`;
}
//获取日期
export function getSomeDayDate(opt={}){
    let{date,days,maxDate,splitter} = opt,
        todayDate = new Date(),
        todayDateStr = getDate(todayDate),
        todayTimestamp = (new Date(todayDateStr)).getTime(),
        maxDateTimestamp = maxDate ? (new Date(maxDate)).getTime() : null,
        dataTimestamp = date ? (new Date(date)).getTime() : null,
        onDayTimestamp = 1000*60*60*24,
        resultTimestamp = null,
        result = null;
    function formatDate(date,splitter){
        return splitter !== undefined ? date.replace(/\//gi,splitter) : date
    }
    if(!days){
        return formatDate(maxDateTimestamp && maxDateTimestamp < todayTimestamp ? maxDate : todayDateStr,splitter);
    }
    if(date && days){
        resultTimestamp = dataTimestamp + onDayTimestamp*days;
        result = getDate(new Date(resultTimestamp)); 
    }
    else if(days){
        resultTimestamp = todayTimestamp + onDayTimestamp*days;
        result = getDate(new Date(resultTimestamp));
    }
    if(maxDate && resultTimestamp > maxDateTimestamp){
        result = maxDate;
    }

    return formatDate(result,splitter);
}
