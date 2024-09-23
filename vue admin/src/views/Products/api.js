import { request } from "../../api/axios";

//添加商品
export const addProduct = (params) => {
  return request('/api/products/add',params,'post' )
}

//获取商品列表
export const getProductList = (params) => {
  return request('/api/products/',params,'get' )
}

//编辑商品
export const EditProduct = (params) => {
  return request(`/api/products/edit/${params._id}`,params,'post' )
}

// 获取商品详情
export const productsDetil = (params) => {
  return request(`/api/products/productsDetil/${params._id}`,{},'get')
}

//删除商品
export const DelProduct = (params) => {
  return request(`/api/products/delProduct/${params._id}`,{},'DELETE')
}