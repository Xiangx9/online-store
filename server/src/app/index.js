const Koa = require('koa');
const { koaBody } = require('koa-body');
const Cors = require("koa-cors");
const Parameter = require('koa-parameter')
const Router = require('../routes')
const logger = require('koa-logger');
const log = require('../utils/logger')
const ratelimiter = require('../utils/ratelimit') 
const errHandler = require('./errHandler')

const app = new Koa(); // 创建koa实例

app.use(ratelimiter); // 使用限流中间件
app.use(Cors()); // 使用cors中间件 处理跨域请求
app.use(koaBody(
  {
    multipart: true, // 支持文件上传
    strict:false,//设为false
    formidable: {
        maxFileSize: 2000 * 1024 * 1024
    }// 设置上传文件大小最大限制，默认20M
  }
)); // 使用koa-body中间件 处理请求体

app.use(logger()); // 使用logger中间件 处理日志

app.use(log) // 使用自定义日志中间件
app.use(Parameter(app)) // 使用parameter中间件 处理请求参数
app.use(Router.routes()).use(Router.allowedMethods());// 定义路由中间件

app.on('error', errHandler) // 使用错误处理中间件

module.exports = app; // 导出app实例
