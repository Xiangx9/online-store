const Router = require("koa-router"); 
const { auth } = require("../middleware/User");
const {checkProductId} = require("../middleware/Cart");
const {AddCart,getCartList,DeleteCart,UpdateCart,} = require("../controllers/Cart");

const router = new Router({ prefix: '/cart' });

router.post('/AddToCart', auth,checkProductId, AddCart ) //添加到购物车

router.get('/CartList', auth, getCartList) //购物车列表

router.delete('/DeleteCart', auth, DeleteCart) //删除购物车

router.post('/UpdateCart', auth, checkProductId,UpdateCart) //更新购物车


module.exports = router;