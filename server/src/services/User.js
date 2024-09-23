const User = require('../models/user')
const { generateToken, generateRefreshToken, verifyToken } = require('../utils/jwt')
const { hashPassword } = require('../utils/bcrpyt')

// 创建用户
const createtUser = async (username, password) => {
  const user = new User({ username, password });
  await user.save(); // 保存用户
  return user;
}

// 用户登录
const UserLogin = async (username) => {
  const user = await User.findOne({ username }); // 查询用户

  const token = generateToken(user) // 生成token
  const refreshToken = generateRefreshToken(user); // 生成刷新token
  // 将refreshToken存入数据库
  user.refreshToken = refreshToken;
  await user.save();

  const userinfo = {
    token,
    refreshToken,
    user
  }
  return userinfo

}

// 获取用户信息
const getUser = async (id) => {
  const user = await User.findById(id);
  return user
}

//更新密码
const changPassword = async (id, username, newPassword) => {
  const password = await hashPassword(newPassword)//加密
  await User.findByIdAndUpdate({ _id: id }, { password });
}

// 刷新token
const changToken = async (refreshToken) => {
  if (!refreshToken) {
    ctx.status = 400;
    ctx.body = { error: 'refreshToken不能为空' };
    return;
  }
  const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);//验证token
  const user = await User.findById(decoded.id);//查询用户
  if (!user || user.refreshToken !== refreshToken) {
    ctx.status = 403;
    ctx.body = { error: '无效或过期的refreshToken' };
    return;
  }

  const newToken = generateToken(user);     // 生成新的token
  const newRefreshToken = generateRefreshToken(user); // 生成刷新token
  user.refreshToken = newRefreshToken;
  await user.save(); // 保存用户刷新token

  let tokenInfo = {
    token: newToken,
    refreshToken: newRefreshToken,
  }
  return tokenInfo
}

//修改用户信息
const updateUserInfo = async (id, userInfo) => {
  await User.findByIdAndUpdate({_id:id},userInfo)
}

module.exports = {
  createtUser,
  UserLogin,
  getUser,
  changPassword,
  changToken,
  updateUserInfo
}