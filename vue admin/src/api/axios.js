import axios from "axios";
import router from '@/router/index'
import { showMessage } from "./status"; // 引入状态码文件
import { ElMessage } from "element-plus"; // 引入el 提示框，这个项目里用什么组件库这里引什么
import UserStore from "@/store/user"; // 引入用户信息

axios.defaults.baseURL = "";
axios.defaults.headers = {
  //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
  "Content-Type": "application/json;charset=UTF-8", // 传参方式json
  Authorization: `Bearer ${ UserStore().user.token}`, // 这里自定义配置，这里传的是token
};
// 设置接口超时时间
axios.defaults.timeout = 90000;

//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // 配置请求头
    if (config.url == "/api/goods/upload") {
      axios.defaults.headers['Content-Type'] = "multipart/form-data"; //图片上传
    }
    // console.log("config", config.headers);
    return config;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

//刷新token
// 是否正在刷新的标记
let isRefreshing = false
//重试队列
let requests = []
function refreshToken(params) {
  return axios.post("/api/user/refreshToken", params).then((res) => res.data);
}

//http response 拦截器
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做一些处理
    ElMessage.success(response.data.message);
    const newToken = response.headers['authorization'];
    if (newToken) {
      UserStore().user.token = newToken
    }
    return response;
  },
  async (error) => {
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 401) { // 401 token失效
        if (!isRefreshing) {
          isRefreshing = true
          // 发起刷新 token 的请求
          let params = {
            refreshToken: UserStore().user.refreshToken,
          }
          // 刷新token
          return refreshToken(params).then((res) => {
            // console.log("res", res);
            
            UserStore().user.token = res.tokenInfo.token
            UserStore().user.refreshToken = res.tokenInfo.refreshToken

            const newToken = res.tokenInfo.token; // 将新的token保存到本地存储中
            originalRequest.headers.Authorization = `Bearer ${newToken}`; // 将新的token设置到请求头中
            // token 刷新后将数组的方法重新执行
            requests.forEach((cb) => {
              cb(newToken)
            })
            requests = [] // 重新请求完清空
            return axios.request(originalRequest);
          }).catch((err) => {
            // 回到登录页
            router.push({ path: "/login" })
          }).finally(() => {
            isRefreshing = false
          })
        } else {
          // 正在刷新token，将请求存入队列
          return new Promise((resolve, reject) => {
            requests.push((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axios(originalRequest))
            })
          })
        }
      }
      let message =  showMessage(response.status); // 传入响应码，匹配响应码对应信息
      ElMessage.warning(message);
      return Promise.reject(response.data);
    } else {
      ElMessage.warning("网络连接异常,请稍后再试!");
    }
  }
);

// 封装 GET POST 请求并导出
export function request(url = "", params = {}, type = "POST") {
  //设置 url params type 的默认值
  return new Promise((resolve, reject) => {
    let promise;
    if (type.toUpperCase() === "GET") {
      promise = axios({
        url,
        params,
      });
    } else if (type.toUpperCase() === "POST") {
      promise = axios({
        method: "POST",
        url,
        data: params,
      });
    } else if (type.toUpperCase() === "PUT") {
      promise = axios({
        method: "PUT",
        url,
        data: params,
      });
    } else if (type.toUpperCase() === "DELETE") {
      promise = axios({
        method: "delete",
        url,
        params,
      });
    }
    //处理返回
    promise
      .then((res) => {
        console.log("处理返回res", res);
        resolve(res);
      })
      .catch((err) => {
        console.log("处理返回err", err);
        reject(err);
      });
  });
}
