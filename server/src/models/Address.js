const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  // 用户id
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  //姓名
  name: {
    type: String,
    required: true,
  },
  //电话
  phone: {
    type: String,
    required: true,
  },
  //地区
  region: {
    type: String,
    default: "未设置",
  },
  //地址
  address: {
    type: String,
    default: "未设置",
  },
  //是否默认
  isDefault: {
    type: Boolean,
    default: false,
  },
  // 标签
  tag: {
    type: String,
    enum: ['家', '公司', '学校'],
  },
  isDeldeted: { //是否删除
    type: Boolean,
    default: false,
  },
},{ timestamps: true });

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;