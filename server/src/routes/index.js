const fs = require('fs')
const Router = require('koa-router')
const router = new Router()

fs.readdirSync(__dirname).forEach(file => {
  // console.log(file)
  if (file !== 'index.js') {
    let r = require('./' + file)
    router.use(r.routes()) //注册路由
  }
})

module.exports = router //导出
