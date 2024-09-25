const Router = require("koa-router"); //

const {checkProductName} = require('../middleware/Products');
const {auth,checkRole} = require("../middleware/User");

const { getProduct,authProduct ,addProduct,editProduct,getProductDetail,deleteProduct} = require('../controllers/Products');


const router = new Router({ prefix: '/products' });

router.get('/', auth,checkRole(['admin','user']), getProduct) //获取商品列表

router.get('/authProduct',authProduct) //客户端获取商品列表

router.post('/add', auth, checkRole(['admin','user']), checkProductName, addProduct) //添加商品

router.post('/edit/:id',auth,checkRole(['admin','user']),  editProduct) //编辑商品

router.get('/productsDetil/:id', getProductDetail) //获取商品详细

router.delete('/delProduct/:id', auth,checkRole(['admin','user']), deleteProduct) //删除商品

module.exports = router;