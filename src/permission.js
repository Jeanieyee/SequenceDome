/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-11 17:26:43
 * @LastEditTime: 2019-09-25 10:06:19
 * @LastEditors: Please set LastEditors
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// import { setSessionStore, getSessionStore } from '@/utils'
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // if (from.meta && from.meta.keepAlive) {
  //   // console.log('> from', from.meta.keepAlive)
  //   setSessionStore('keepAliveFlag', true)
  // }
  // start progress bar
  NProgress.start()
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
