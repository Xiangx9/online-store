import { request } from "../../api/axios";

// 注册
export const register = (params) => {
  return request('/api/user/register',params, 'post')
}

// 登录 
export const login = (params) => {
  return request('/api/user/login',params, 'post')
}


// 修改用户信息
export const updatePassword = (params) => {
  return request('/api/user/updatePassword',params, 'put')
}