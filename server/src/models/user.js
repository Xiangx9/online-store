const moogoose = require('mongoose');

const UserSchema = new moogoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,// 唯一
    comment: '用户名'
  },
  password: {
    type: String,
    required: true,
    comment: '密码'
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guest',],//限定role的值只能是admin、user、guest
    default: 'guest',
    comment: 'admin（管理员）, user（用户）, guest （访客）',
  },
  avatar: {
    type: String,
    default: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1pNkT8.img?w=640&h=494&m=6&x=223&y=126&s=192&d=192',
    comment: '头像'
  }, 
  address: {
    type: String,
    default: '未设置',
    comment: '地址'
  },
  phone: {
    type: String,
    default: '未设置',
    comment: '电话'
  },
  refreshToken:String
}, { timestamps: true })

const User = moogoose.model('User', UserSchema); //将UserSchema转换为User模型

module.exports = User