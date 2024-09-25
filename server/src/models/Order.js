const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true
  },    // 订单编号
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },  // 用户信息（关联用户表）
  products: [{   // 订单中的商品信息
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },   // 关联商品表
    quantity: { type: Number, required: true },   // 商品数量
    price: { type: Number, required: true }       // 商品单价
  }],
  totalAmount: {
    type: Number,
    required: true
  },   // 订单总金额
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],// 订单状态，包括 pending（待处理）、processing（处理中）、shipped（已发货）、delivered（已送达）、cancelled（已取消）
    default: 'pending',
  },    // 订单状态，默认是 pending

}, { timestamps: true })
const Order = mongoose.model("Order", orderSchema);


module.exports = Order