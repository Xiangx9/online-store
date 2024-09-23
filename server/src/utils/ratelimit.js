// 限流 加入黑白名单
const ratelimit = require('koa-ratelimit')
const Redis = require('ioredis')

const ratelimiter = ratelimit({ // 限制器配置
  driver: 'redis',
  db: new Redis({
    'max_clients': 10,//最大连接数
    'min_clients': 1,//最小连接数
    'port': 6379,//端口号
    'host': '127.0.0.1',//主机
    // 'password': '1234567',//密码
  }),
  duration: 60000, // 时间 毫秒
  errorMessage: '请求过于频繁，请稍后再试',// 超过限制后的提示信息
  id: (ctx) => ctx.ip,// 根据ip限制
  headers: { // 返回给客户端的header信息
    remaining: 'Rate-Limit-Remaining',// 剩余次数
    reset: 'Rate-Limit-Reset',// 重置时间
    total: 'Rate-Limit-Total'// 总次数
  },
  max: 30, // 最大限制
  disableHeader: false,// 是否禁用header返回
  whitelist: (ctx) => { // 白名单
    console.log('白名单', ctx.ip);
  },
  blacklist: (ctx) => { // 黑名单
    console.log('黑名单', ctx.ip);
  }
})

module.exports = ratelimiter