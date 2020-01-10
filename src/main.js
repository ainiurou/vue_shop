// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'      //导入这个后才加载出了按钮的效果
import './plugins/element.js'
//import ElementUI from 'element-ui'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

//axios请求拦截
axios.interceptors.request.use(config=>{
  //为请求头对象，添加Token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
return config
})
Vue.config.productionTip = false
//Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  //el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render:h=>h(App)
}).$mount('#app')
