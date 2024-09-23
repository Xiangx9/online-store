const Products = require('../models/Products');
const {ProductName}= require('../constant/errorType')

// 检查商品名称是否已存在
const checkProductName = async (ctx, next) => {
  try {
    const { Name } = ctx.request.body;
    const product = await Products.findOne({ Name });
    if (product) {
      console.error('商品名称已存在', ctx.request.body)
      ctx.app.emit('error',ProductName , ctx)
      return
    }
    await next();
  } catch (error) {
      console.log('商品名称检查失败', error);
  }
}

module.exports = {
  checkProductName
}