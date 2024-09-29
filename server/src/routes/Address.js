const Router = require("koa-router"); 
const { auth } = require("../middleware/User");
const { addAddress, userAddress, updateAddress ,delAddress} = require("../controllers/Address");
const router = new Router({ prefix: '/Address' });

router.post('/addAddress', auth,addAddress ) // 添加地址

router.get('/userAddress', auth,userAddress) // 获取用户地址

router.post('/updateAddress', auth,updateAddress ) // 修改地址

router.post('/delAddress', auth,delAddress ) // 删除地址


module.exports = router;