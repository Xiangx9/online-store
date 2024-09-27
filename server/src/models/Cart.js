const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { // 用户
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: { // 商品
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {// 商品数量
        type: Number,
        default: 1,
        required: true,
      },
      isDeleted: { // 是否删除
        type: Boolean,
        default: false,
      },
      isSettled: {  // 是否结算
        type: Boolean,
        default: false,
      }
    },
  ],
  total: { // 总价
    type: Number,
    default: 0,
    required: true,
  },

},{ timestamps: true })

// 自动计算 total 值
cartSchema.pre('save', async function (next) {
  const cart = this;

  // 如果没有任何商品，total 就是 0
  if (cart.products.length === 0) {
    cart.total = 0;
    return next();
  }

  // Populate 产品信息以获取价格
  await cart.populate('products.productId');

  // 计算总价
  cart.total = cart.products.reduce((acc, item) => {
    return acc + item.productId.Price * item.quantity; // 假设 Product 模型有一个 `Price` 字段
  }, 0);
  next();
});
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;