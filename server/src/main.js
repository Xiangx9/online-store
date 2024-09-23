const { APP_PORT } = require('./utils/globalVariables') //导入端口号
const connectDB = require('./utils/db')

const app = require('./app') //导入app实例

//连接数据库
connectDB().then(()=>{
  app.listen(APP_PORT, () => { //监听端口
    console.log(`server is running on http://localhost:${APP_PORT}`)
  })
})
