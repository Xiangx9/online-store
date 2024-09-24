import { request } from "../../api/axios";


// 获取用户列表
export const getUserList = (params) => {
  return request('/api/user/userList',{},'get')
}

// 修改用户权限
export const updateRole = (params) => {
  return request('/api/user/updateRole',params,'post')
}