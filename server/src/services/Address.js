const Address = require('../models/Address')

// 检查是否已经有默认地址
const checkDefault = async (userId) => {
  const address = await Address.findOne({ userId: userId, isDefault: true })
  return address
}
//添加地址
const addAddres = async (parm) => {
  const isDefault = await checkDefault(parm.userId)
  if (isDefault) {
    await Address.findByIdAndUpdate(isDefault._id, { isDefault: false })
  }
  const address = new Address(parm)
  await address.save()
}

//获取用户地址
const userAddres = async (userId) => {
  const address = await Address.find({ userId:userId, isDeldeted:false}).populate('userId').sort({createdAt: -1 })
  return address
}

//修改地址
const updateAddres = async (id, parm) => {
  const isDefault = await checkDefault(parm.userId)
  if (isDefault) {
    await Address.findByIdAndUpdate(isDefault._id, { isDefault: false })
  }
  await Address.findByIdAndUpdate(id, parm)
}

//删除地址
const delAddres = async (id) => {
  await Address.findByIdAndUpdate(id, { isDeldeted: true })

}
module.exports = {
  addAddres, userAddres, updateAddres, delAddres
}