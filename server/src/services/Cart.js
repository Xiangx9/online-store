const Cart = require("../models/Cart");
const Products = require('../models/Products');

const createCart = async (params) => {
  const { userId, productId, quantity } = params
  // 查找用户的购物车
  let cart = await Cart.findOne({ userId }); // 如果购物车不存在，则创建一个新的购物车
  if (!cart) {
    cart = new Cart({
      userId,
      products: [],
      total: 0,
      isOrdered: false
    });
  }
  // 检查购物车中是否已存在该产品
  const productIndex = cart.products.findIndex(item => item.productId.equals(productId));
  if (productIndex >= 0) {
    // 如果购物车中已有该产品，更新数量
    cart.products[productIndex].quantity += Number(quantity);
  } else {
    // 如果购物车中没有该产品，添加新产品
    cart.products.push({ productId:  productId, quantity });
  }

  // 保存购物车，触发 pre('save') 钩子自动计算总价
  await cart.save();
  return cart;

};

// 获取购物车列表
const getCartLists = async (userId) => {
  const cart = await Cart.find({ userId }).populate('products.productId').sort({ createdAt: -1 })
  return cart;
}


// 修改购物车
const updateCarts = async (id,productId, quantity,) => {
  let cart = await Cart.findById({_id:id});
  const productIndex = cart.products.findIndex(item => item.productId.equals(productId));
  cart.products[productIndex].quantity = Number(quantity);
  await cart.save();
  return cart
}

// 删除购物车
const deleteCarts = async (id,productId) => {
  let cart = await Cart.findById({ _id: id });
  const productIndex = cart.products.findIndex(item => item.productId.equals(productId));
  cart.products.splice(productIndex, 1);
  await cart.save();
  return cart
}

module.exports = {
  createCart,
  getCartLists,
  updateCarts,
  deleteCarts
}
