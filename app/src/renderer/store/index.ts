/*
 * @Author: xa
 * @Date: 2018-08-31 21:16:32
 * @LastEditors: xiaoai
 * @LastEditTime: 2018-12-26 22:22:55
 * @Description: Whatever is worth doing is worth doing well(任何值得做的事就值得把它做好)
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations
})
