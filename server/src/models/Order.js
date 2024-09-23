const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { // 用户id
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [ // 订单商品
    {
      name: { type: String, required: true }, // 商品名称
      qty: { type: Number, required: true }, // 商品数量
      image: { type: String, required: true }, // 商品图片
      price: { type: Number, required: true }, // 商品价格
      product: { // 商品id
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shippingAddress: { // 收货地址
    address: { type: String, required: true }, // 详细地址
    city: { type: String, required: true }, // 城市
    postalCode: { type: String, required: true }, // 邮编
    country: { type: String, required: true },  // 国家
  },
  paymentMethod: { type: String, required: true }, // 支付方式
  paymentResult: { // 支付结果
    id: { type: String }, // 支付id
    status: { type: String }, // 支付状态
    update_time: { type: String }, // 支付更新时间
    }
}, { timestamps: true })
const Order = mongoose.model("Order", orderSchema);


module.exports = Order