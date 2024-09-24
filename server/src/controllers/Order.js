const {newOrder,OrderLists} = require('../services/Order')
const { OrderListError,createOrderError  } = require('../constant/errorType')

//创建订单
const createOrder = async (ctx, next) => {
    const { userId, productId, amount } = ctx.request.body
    try {
      await newOrder({ userId, productId, amount })
      ctx.body = {
        code: 200,
        message: '创建订单列表成功',
        result: ''
      }
    } catch (error) {
      console.error('创建订单列表失败', error)
      ctx.app.emit('error', createOrderError, ctx)
    }
}

// 获取订单列表
const getOrderList = async (ctx, next) => {
    try {
      const OrderList = await OrderLists()
      ctx.body = {
        code: 200,
        message: '获取订单列表成功',
        result: OrderList
      }
    } catch (error) {
      console.error('获取订单列表失败', ctx.request.body)
      ctx.app.emit('error', OrderListError, ctx)
    }
}

module.exports = {
  getOrderList,
  createOrder
}