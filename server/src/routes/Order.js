const Router = require("koa-router"); 
const {auth} = require("../middleware/User");
const {getOrderList,createOrder} = require("../controllers/Order");

const router = new Router({ prefix: '/order' });

router.post('/createOrder', auth, createOrder) //创建订单

router.get('/orderList', auth, getOrderList) //获取订单列表

module.exports = router;