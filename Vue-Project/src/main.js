// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/global.css' // 全局样式表
//引入echart
import introCharts from './echart/introCharts.js'

//引入elmentui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
axios.interceptors.request.use(config => {
  // console.log('这是config'+config)
  config.headers.Authorzization = window.sessionStorage.getItem('token')
  return config
})
//请求基本前缀

axios.defaults.baseURL = 'http://localhost:3000/'

// // 在这里使用路由的导航守卫进行权限控制
// // 可以自定义不需要校验用户的路由白名单
// const whiteList = [
//   '/',
//   '/Introduction',
//   '/login',
//   '/news',
//   '/fc',
//   '/fcDetail',
//   '/LeaveMessage',
//   '/newsDetails',
//   '/registered'
// ]
// const ordinaryList = [
//   '/post',
//   '/chat',
//   '/classMessageBoard',
//   '/classPhotoAlbum',
//   '/myClassSrc'
// ] //普通用户可以进入的路由
// const classManagementList = [
//   '/managementPhoto',
//   '/manageMessageBoard',
//   '/classSrc'
// ] //班级管理员以上权限才可进入的路由
// router.beforeEach(async (to, from, next) => {
//   // 要去的页面是白名单，直接跳转
//   if (whiteList.includes(to.path)) {
//     next()
//   }
//   // 不是白名单
//   var role = store.role
//   if (role == 'ordinary' && ordinaryList.includes(to.path)) {
//     //普通用户
//     next()
//   }
//   if (role == 'root') {
//     next() //超级系统管理员可以跳转到任何页面
//   }
//   if (
//     role == 'classManagement' &&
//     classManagementList.concat(ordinaryList).includes(to.path)
//   ) {
//     next()
//   }
// })
// vuex

Vue.use(ElementUI).use(introCharts)

Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.prototype.formatDate = function(val) {
  return val.date.substring(0, 10)
}
Vue.prototype.forDate = function(val) {
  return val.time.substring(0, 10)
}
Vue.prototype.nj = function(val) {

  return val.nj + '级'
}
//时间过滤器
Vue.filter('dateFilter', function(val) {
  return val.substring(0, 10)
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
