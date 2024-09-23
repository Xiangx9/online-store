import { request } from "../../api/axios";

// 获取用户信息
export const getUserInfo = (params) => {
  return request('/api/user/getUserInfo',params, 'get')
}