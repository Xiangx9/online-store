const { createCart, getCartLists, updateCarts,deleteCarts } = require('../services/Cart')
const { CartListError, AddCartError,CartUpdateError,CartDeleteError } = require('../constant/errorType')

//添加购物车
const AddCart = async (ctx, next) => {
  try {
    const { productId, quantity } = ctx.request.body;
    const userId = ctx.state.user.id;
    await createCart({ userId,productId, quantity  })
    ctx.body = {
      code: 200,
      message: '添加成功',
      result: ''
    }
  } catch (error) {
    console.error('添加购物车失败', error)
    ctx.app.emit('error', AddCartError, ctx)
  }
}

// 获取购物车列表
const getCartList = async (ctx, next) => {
  try {
    const { id } = ctx.state.user
    const CartList = await getCartLists(id)
    ctx.body = {
      code: 200,
      message: '获取列表成功',
      result: CartList
    }
  } catch (error) {
    console.error('获取购物车列表失败', ctx.request.body)
    ctx.app.emit('error', CartListError, ctx)
  }
}

// 删除购物车
const DeleteCart = async (ctx, next) => {
  try {
    const { id, productId } = ctx.query;
    await deleteCarts(id,productId)
    ctx.body = {
      code: 200,
      message: '删除成功',
      result: ''
    }
  } catch (error) {
    console.error('删除购物车失败', ctx.query)
    ctx.app.emit('error', CartDeleteError, ctx)
  }

}

// 修改购物车
const UpdateCart = async (ctx, next) => {
  try {
    const {id,productId,  quantity } = ctx.request.body
    await updateCarts(id,productId, quantity,)
    ctx.body = {
      code: 200,
      message: '修改成功',
      result: ''
    }    
  } catch (error) {
    console.error('修改购物车失败', error)
    ctx.app.emit('error', CartUpdateError, ctx)
  }
}


module.exports = {
  AddCart,
  getCartList,
  DeleteCart,
  UpdateCart,
}