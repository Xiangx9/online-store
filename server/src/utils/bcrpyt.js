// 密码加密
const bcrypt = require('bcryptjs')

const hashPassword = async (password) => { // 加密
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => { // 比较密码
  return bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
}