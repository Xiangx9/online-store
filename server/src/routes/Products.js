const Router = require("koa-router"); //

const {checkProductName} = require('../middleware/Products');
const {auth} = require("../middleware/User");

const { getProduct ,addProduct,editProduct,getProductDetail,deleteProduct} = require('../controllers/Products');


const router = new Router({ prefix: '/products' });

router.get('/',auth, getProduct) //获取商品列表

router.post('/add', auth, checkProductName, addProduct) //添加商品

router.post('/edit/:id',auth, editProduct) //编辑商品

router.get('/productsDetil/:id', auth, getProductDetail) //获取商品详细

router.delete('/delProduct/:id',auth,deleteProduct)
module.exports = router;