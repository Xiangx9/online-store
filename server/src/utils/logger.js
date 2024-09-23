// 请求日志
const dayjs = require('dayjs')
const fs = require('fs')
const path = require('path')

// 创建一个可写流，用于写入日志文件
const logStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });

const log = async (ctx, next) => {
  const start = Date.now(); // 记录当前时间
  await next(); // 执行后续中间件

  // 请求日志
  
  const ms = Date.now() - start; // 计算请求耗时
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss'); // 获取当前时间
  const log = `时间：${time}；${ctx.method}；请求：${ctx.url} - ${ctx.status} ${ms}ms\n`; // 构造日志字符串
  
  console.log(log);
  logStream.write(log); // 将日志写入文件
};

module.exports = log
