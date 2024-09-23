
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from './uni_modules/vk-uview-ui';
import './iconfont/iconfont.css'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView);
const app = new Vue({
    ...App
})
import httpInterceptor from '@/common/Request.js'
Vue.use(httpInterceptor, app)

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif