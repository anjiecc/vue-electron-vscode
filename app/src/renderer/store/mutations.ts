/*
 * @Author: xa
 * @Date: 2018-08-31 21:16:38
 * @LastEditors: xa
 * @LastEditTime: 2018-09-07 14:52:21
 * @Description: Whatever is worth doing is worth doing well(任何值得做的事就值得把它做好)
 */
import { MutationTree } from 'vuex'

const mutations: MutationTree<any> = {
  /**
   * 设置主题
   */
  setTheme(state: any, value: string): void {
    state.theme = value
  },
  /**
   * 设置打开文件列表
   */
  setOpenFileList(state: any, value: { title: string, path: string, isSave: boolean}): void {
    if (state.openFileList.map(item => item.title).indexOf(value.title) < 0) {
      state.openFileList.push(value)
    }
  },
  /**
   * 删除打开文件列表
   */
  delOpenFileList(state: any, value: string): void {
    state.openFileList = state.openFileList.filter(item => { return item.path !== value })
  },
  /**
   * 打开文件列表
   */
  setFileList(state: any, value: Array<object>): void {
    // 打开文件关闭之前已经打开的文件，此方法比较暴力后期会进行优化
    state.fileList = []
    state.openFileList = []
    state.fileList = value
  },
  /**
   * 设置未保存的文件
   */
  setNoSaveList(state: any, value: {title: string, path: string}): void {
    for (let i = 0, len = state.openFileList.length; i < len; i++) {
      if (state.openFileList[i].path === value.path) {
        state.openFileList[i]['isSave'] = true //  设置未保存字段
        break
      }
    }
  },
  /**
   * 保存文件
   */
  setSaveList(state: any, value: {title: string, path: string}): void {
    for (let i = 0, len = state.openFileList.length; i < len; i++) {
      if (state.openFileList[i].path === value.path) {
        state.openFileList[i]['isSave'] = false
        break
      }
    }
  }
}

export default mutations
