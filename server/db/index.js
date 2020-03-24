// 导入 mongoose 模块
const mongoose = require('mongoose');
const mongooseConfig = 'mongodb://127.0.0.1:27017/iconfont'

// 设置默认 mongoose 连接
mongoose.connect(mongooseConfig,{useNewUrlParser:true,useUnifiedTopology:true});
// 取得默认连接
const db = mongoose.connection;
// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('connected',console.error.bind(console,'MongoDB 连接成功'))
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));