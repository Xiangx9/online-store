const {addAddres,userAddres,updateAddres,delAddres}=require('../services/Address')
// 添加地址
const addAddress = async (ctx, next) => {
  const {userId,name,phone,region,address,isDefault,tag} = ctx.request.body
  const result = await addAddres({userId,name,phone,region,address,isDefault,tag})
  ctx.body = {
    code: 200,
    msg: '添加成功',
    data: result
  }
}

// 获取地址
const userAddress = async (ctx, next) => {
  const { id } = ctx.state.user // 获取用户id
  const result = await userAddres(id)
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: result
  }
}

// 修改地址
const updateAddress = async (ctx, next) => {
  const { _id, name, phone, region, address, isDefault, tag } = ctx.request.body
  const { id } = ctx.state.user // 获取用户id
  const pram = { name, phone, region, address, isDefault, tag } 
  pram.userId = id
  const result = await updateAddres(_id , pram)
  ctx.body = {
    code: 200,
    msg: '修改成功',
    data: result
  }
}

// 删除地址
const delAddress = async (ctx, next) => {
  const { id } = ctx.request.body
  const result = await delAddres(id)
  ctx.body = {
    code: 200,
    msg: '删除成功',
    data: result
  }
}

module.exports = {
  addAddress,
  userAddress,
  updateAddress,
  delAddress,
}