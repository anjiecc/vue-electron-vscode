/*
 * @Author: xa
 * @Date: 2018-08-30 12:10:37
 * @LastEditors: xiaoai
 * @LastEditTime: 2018-12-26 22:21:45
 * @Description: Whatever is worth doing is worth doing well(任何值得做的事就值得把它做好)
 */
import Vue from 'vue'
import iView from 'iview'
// import VCharts from 'v-charts'
import 'iview/dist/styles/iview.css'
import VueI18n from 'vue-i18n'
import en from 'iview/dist/locale/en-US'
import zh from 'iview/dist/locale/zh-CN'

import App from './App.vue'
import router from './router'
import { Route } from 'vue-router'
import store from './store'
import extend from './extend'
import systemZh from './i18n/zh'
import systemEn from './i18n/en'
import { getCookie } from './util/cookie'

/* eslint-disable */
// declare global {
//   interface Window {
//     jcode: Object;
//   }
// }

// declare var window: Window & { jcode: Object}
// interface W {
//   jcode?: Object
// }

// (<W>window).jcode = {  }
// (window as any).jcode = {
//   $event: new Observer()
// }

// (window as any).jcode = {
//   $event: new Observer()
// }

Vue.use(extend)
Vue.use(iView)
Vue.use(VueI18n)
// Vue.use(VCharts)

// Vue.locale = () => {}
const messages = {
  en: Object.assign(systemEn, en),
  zh: Object.assign(systemZh, zh)
}

const i18n: any = new VueI18n({
  locale: getCookie('lan', 'zh'),
  messages
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

router.beforeEach((to: Route, from: Route, next: Function) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach((to: Route, from: Route) => {
  iView.LoadingBar.finish()
})

localStorage.setItem('username', 'admin')
localStorage.setItem('password', '123456')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  // render: (h:(a:any)=>VNode) => h(App)
  render: h => h(App)
})
