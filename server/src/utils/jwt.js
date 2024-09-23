const jwt = require('jsonwebtoken')

// 生成访问 Token
 const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn:  process.env.JWT_EXPIRES_IN || '1d',  // 访问 Token 有效期为1天
  });
};

// 生成刷新 Token
 const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',  // 刷新 Token 有效期为 7 天
  });
};

// 验证Token
 const verifyToken = (token, secret) => {
  return jwt.verify(token, secret); // 验证 Token 是否有效
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken
}