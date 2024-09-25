const { addProducts, getProducts,authProducts, editProducts, deleteProducts,getProductDetails } = require('../services/Products')
const { ProductAddError, ProductGetError, ProductUpdateError,deleteProductErr } = require('../constant/errorType')

// 添加商品
const addProduct = async (ctx, next) => {
  try {
    const { id } = ctx.state.user
    const { Name, Description, Price, Image, Stock, Status } = ctx.request.body
    let params = { Name, Description, Price, Image, Stock, Status, }
    params.UserId = id
    const result = await addProducts(params)
    ctx.body = {
      code: 200,
      message: '添加商品成功',
      data: result
    }
  } catch (error) {
    console.error('添加商品失败', ctx.request.body)
    ctx.app.emit('error', ProductAddError, ctx)
  }
}

// 删除商品
const deleteProduct = async (ctx, next) => {
  try {
    const id = ctx.params.id
    await deleteProducts(id)
    ctx.body = {
      code: 200,
      message: '删除成功',
    }
  } catch (error) {
    console.log('删除商品失败', error);
    ctx.app.emit('error',deleteProductErr , ctx)
  }
}

// 更新商品
const editProduct = async (ctx, next) => {
  try {
    let { Name, Description, Price, Image, Stock, Status } = ctx.request.body
    let params = { Name, Description, Price, Image, Stock, Status, }
    const id = ctx.params.id;
    const result = await editProducts(id, params)
    ctx.body = {
      code: 200,
      message: '更新商品成功',
      data: result
    }
  } catch (error) {
    console.error('更新商品失败', ctx.request.body)
    ctx.app.emit('error', ProductUpdateError, ctx)
  }
}

// 获取商品列表
const getProduct = async (ctx, next) => {
  try {
    const { id } = ctx.state.user
    const params = ctx.query
    params.UserId = id
    const result = await getProducts(params)
    ctx.body = {
      code: 200,
      message: '获取商品列表成功',
      data: result
    }
  } catch (error) {
    console.error('获取商品列表失败', ctx.request.body)
    ctx.app.emit('error', ProductGetError, ctx)
  }
}

//客户端获取商品列表
const authProduct= async (ctx, next) => {
  try {
    const params = ctx.query
    const result = await authProducts(params)
    ctx.body = {
      code: 200,
      message: '获取商品列表成功',
      data: result
    }
  } catch (error) {
    console.error('获取商品列表失败', ctx.request.body)
    ctx.app.emit('error', ProductGetError, ctx)
  }
}

// 获取商品详情
const getProductDetail = async (ctx, next) => {
  try {
    const id = ctx.params.id
    const ProductDetil = await getProductDetails(id)
    ctx.body = {
      code: 200,
      message: '获取商品列表成功',
      data:ProductDetil
    }
  } catch (error) {
    console.log('获取商品详情失败', error);
    ctx.app.emit('error', ProductGetError, ctx)
  }
}

// 获取商品分类
const getProductCategory = async (ctx, next) => {
  
}

module.exports = {
  addProduct,
  authProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProductDetail,
  getProductCategory
}