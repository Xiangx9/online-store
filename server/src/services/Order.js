const Order = require('../models/Order');

// 创建订单
const newOrder = async (order) => {
  const newOrder = new Order(order);
  await newOrder.save();
  return newOrder;
}

// 获取订单列表
const OrderLists = async () => {
  const orderList = await Order.find().populate('user');
  return orderList;
}
module.exports = {
  OrderLists,
  newOrder
}