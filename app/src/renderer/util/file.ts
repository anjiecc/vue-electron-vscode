const fs = require('fs')

class File {
  constructor() {}
  /**
   * 异步读取文件夹信息
   * @param src 文件路径
   */
  getFolder(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.readdir(src, (err, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files)
        }
      })
    })
  }
  /**
   * 同步读取文件夹
   * @param src 文件路径
   */
  getFolderSync(src: string) {
    return fs.readdirSync(src)
  }
  /**
   * 判断当前文件是否是文件夹
   * @param src 文件路径
   */
  isDirectory(src: string): Boolean {
    let stats = fs.lstatSync(src)
    return stats.isDirectory()
  }
  /**
   * 获取文件内容
   * @param src 文件路径
   */
  getFileContent(src: string): string {
    let f = fs.readFileSync(src, 'utf8')
    if (f) {
      return f
    }
    return ''
  }
  /**
   * 写入文件
   * @param src 文件地址
   * @param content 文件内容
   */
  setFileContent(src: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(src, content, function(err) {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }
}

export default new File()
