const Cart = require("../models/Cart");
const Products = require('../models/Products');
const mongoose = require('mongoose');
const { ProducError, } = require('../constant/errorType')
// 检查 ObjectId 是否有效的帮助函数
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// 检查是否存在有效的产品 ID
const checkProductId = async (ctx, next) => {
  try {
    const { productId } = ctx.request.body;// 获取产品 ID
    // 验证 userId 和 productId 是否为有效的 ObjectId
    if (!isValidObjectId(productId)) {
      ctx.status = 400;
      ctx.body = { message: '传参错误' };
      return;
    }
    // 检查是否存在有效的产品 ID
    const product = await Products.findById(productId);
    if (!product) {
      console.error('产品不存在', ctx.request.body)
      ctx.app.emit('error', ProducError, ctx)
      return
    }
    await next();
  } catch (error) {
    console.error('产品不存在', error)
  }
}



module.exports = {
  checkProductId
}