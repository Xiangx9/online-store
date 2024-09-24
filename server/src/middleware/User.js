const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { hashPassword, comparePassword } = require('../utils/bcrpyt')

const { userFormateError, userAlreadyExited, userDoesNotExist, invalidPassword, tokenExpiredError } = require('../constant/errorType')

// 验证用户名或密码是否空
const checkEmpty = async (ctx, next) => {
  try {
    const { username, password } = ctx.request.body
    if (!username || !password) {
      console.error('用户名或密码为空', ctx.request.body)
      ctx.app.emit('error', userFormateError, ctx)
      return
    }
    await next()
  } catch (error) {
    console.error("验证用户名或密码是否空", error);
  }
}

// 验证用户名是否已经存在
const checkUser = async (ctx, next) => {
  try {
    const { username } = ctx.request.body
    const user = await User.findOne({ username })
    if (user) {
      console.error('用户名已存在', ctx.request.body)
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
    await next()
  } catch (error) {
    console.error("验证用户名是否存在", error);
  }
}
// 密码加加密
const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const hash = await hashPassword(password)//加密

  ctx.request.body.password = hash

  await next()
}

//验证用户是否注册,密码是否正确
const checkLogin = async (ctx, next) => {
  try {
    const { username, password } = ctx.request.body;
    const user = await User.findOne({ username })

    if (!user || !(await comparePassword(password, user.password))) {
      console.error('验证用户是否注册,密码是否正确', ctx.request.body)
      ctx.app.emit('error', !user ? userDoesNotExist : invalidPassword, ctx)
      return
    }
    await next()
  } catch (error) {
    console.log("验证用户是否注册", error);
  }
}

// 验证用户登录是否过期
const auth = async (ctx, next) => {
  const token = ctx.headers.authorization?.split(' ')[1];
  if (!token) {
    ctx.status = 400;
    ctx.body = '请登录';
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const currentTime = Math.floor(Date.now() / 1000); // 当前时间（秒）
    // 如果 token 剩余有效期小于 60 分钟，则生成新 token
    if (user.exp - currentTime < 60 * 60) {
      const newToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
      ctx.set('Authorization', `Bearer ${newToken}`); // 将新 token 设置到响应头中
    }
    // 将用户信息挂载到上下文中
    ctx.state.user = user;
    await next();
  } catch (error) {
    console.log("验证用户登录是否过期", error);
    ctx.app.emit('error', tokenExpiredError, ctx)
  }
}

// 验证用户权限
const checkRole = (roles) => {
  return async (ctx, next) => {
    const user = ctx.state.user; // 获取当前登录用户
    const role =await User.findById(user.id).then(res=>res.role) // 获取当前用户的角色
    if (!roles.includes(role)) {
      ctx.status = 403;
      ctx.body = { message: '权限不足' };
      return;
    }

    await next();  // 用户角色匹配，继续执行后续中间件
  }
}

module.exports = {
  checkEmpty,
  checkUser,
  crpytPassword,
  checkLogin,
  auth,
  checkRole
}