// 数据库连接
const mongoose = require('mongoose');

const url = process.env.MONGO_URI || 'mongodb://localhost:27017/';
const optins = {
  dbName: process.env.MONGO_DB_NAME,// 数据库名称
}

// 连接数据库
const connectDB = async () => {
  try {
    await mongoose.connect(url, optins);
    console.log('数据库连接成功');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;