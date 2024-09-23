const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    comment: '商品名称'
  },
  Description: {
    type: String,
    required: true,
    comment: '商品描述'
  },
  Price: {
    type: Number,
    required: true,
    comment: '商品价格'
  },
  Image: [{
    type: Object, // 使用数组来存储多个图片对象
    default: [], // 默认值为一个空数组
    comment: '商品图片'
  }],
  Stock: {
    type: Number,
    required: true,
    comment: '商品库存'
  },
  Status: {
    type: String,
    required: true,
    default: 0,
    comment: '商品状态'
  }, // 0: 下架 1: 上架
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, // 创建商品的人
  isDeleted: { type: Boolean, default: false },  // 软删除标志
  deletedAt: { type: Date }  // 记录删除时间
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product

