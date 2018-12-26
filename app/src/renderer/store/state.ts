/*
 * @Author: xa
 * @Date: 2018-08-31 21:16:42
 * @LastEditors: xiaoai
 * @LastEditTime: 2018-12-26 22:18:38
 * @Description: Whatever is worth doing is worth doing well(任何值得做的事就值得把它做好)
 */
interface State {
  // 主题
  theme: string,
  // 当前打开文件列表
  openFileList: Array<object>,
  // 打开文件列表
  fileList: Array<object>,
  // 编辑文件未保存
  noSaveList: Array<object>
}

let state: State = {
  // theme: 'vs-dark'
  theme: 'vs',
  openFileList: [],
  fileList: [],
  noSaveList: []
}

export default state
