/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-11 17:26:43
 * @LastEditTime: 2019-09-11 17:26:43
 * @LastEditors: your name
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import components from '@/components'
import App from './App'
import store from './store'
import router from './router'
import '@/permission' // permission control
import VueFullPage from 'vue-fullpage.js'


// import htmlToPdf from '@/utils/htmlToPdf'
import globalFn from '@/utils'
import enums from '@/utils/enums'
import * as validate from '@/utils/validate' // 全局验证规则
import config from '@/utils/global' // 全局方法
import * as filters from './filters' // 过滤器
import * as directives from '@/directives'

// 全局组件
Object.keys(components).forEach(key => {
  var name = key.replace(/(\w)/, v => v.toUpperCase()) // 首字母大写
  Vue.component(`${name}`, components[key])
})
// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 全局方法
Vue.prototype.$fn = globalFn
// 全局枚举
Vue.prototype.$enums = enums
// 全局验证规则
Vue.prototype.$valid = validate
// 全局变量
Vue.prototype.$config = config
/* 注册全局指令*/
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives)[key])
})
router.afterEach(() => {
  window.scrollTo(0, 0)
})
Vue.use(ElementUI)
Vue.use(VueFullPage)

import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css


Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  // components: { App }
  render: h => h(App)
})
