const Products = require('../models/Products');

// 添加商品
const addProducts = async (product) => {
  try {
    const newProduct = new Products(product);
    await newProduct.save(); // 保存商品
    return newProduct;
  } catch (error) {
    throw new Error(error);
  }
}

// 获取商品
const getProducts = async (params) => {
  try {
    const {UserId, Status } = params
    let query = { //按条件查询
      UserId,
      isDeleted: false,
      ...(Status && { Status }),//如果Status存在，则添加到查询条件中 //如果Status不存在，则不添加到查询条件中
    };
    // 分页
    const pageSize =params.pageSize || 10, pageNumber = params.pageNumber || 1;
    const totalCount = await Products.countDocuments();
    const products = await Products.find(query).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({createdAt: -1}).populate('UserId').exec();
    return {totalCount, products};
  } catch (error) {
    throw new Error(error);
  }
}

//编辑商品
const editProducts = async (id, product) => {
  try {
    const res = await Products.findByIdAndUpdate(id, product, {new: true});
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

// 删除商品
const deleteProducts = async (id) => {
  try {
    await Products.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date()  // 设置删除时间
    });
  } catch (error) {
    throw new Error(error);
  }
}

//获取商品详情
const getProductDetails = async (id) => {
  try {
    const ProductDetil = await Products.findById(id)
    return ProductDetil
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  addProducts,
  getProducts,
  editProducts,
  deleteProducts,
  getProductDetails,
}