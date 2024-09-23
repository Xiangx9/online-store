// 引入ali-oss
// const OSS = require('ali-oss')
import OSS from 'ali-oss';
/**
 *  [accessKeyId] {String}：通过阿里云控制台创建的AccessKey。
 *  [accessKeySecret] {String}：通过阿里云控制台创建的AccessSecret。
 *  [bucket] {String}：通过控制台或PutBucket创建的bucket。
 *  [region] {String}：bucket所在的区域， 默认oss-cn-hangzhou。
 */
export function client() {//data后端提供数据
  return new OSS({
    region: 'oss-cn-hangzhou',      // 地区
    accessKeyId: 'LTAI5tCQNTxM578yRcMv4Bsu',  // AccessKey管理那里的数据
    accessKeySecret:  'Jc4LsCRHWxONkFxI300EVYyPhEiwiJ', //ccessKey管理那里的数据
    bucket: 'xmydate',     // 就是创建的bucket名字 
    timeout: 600000, // 设置超时时间
  })
}


/**
 * 生成随机文件名称
 * 规则八位随机字符，加下划线连接时间戳
 */
export const getFileNameUUID = () => {
  function rx() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${+new Date()}_${rx()}${rx()}`
}
