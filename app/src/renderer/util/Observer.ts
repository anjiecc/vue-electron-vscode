let observerIns = null
/**
 * 订阅发布模式
 */
class Observer {
  event: Object
  constructor() {
    console.log('inininininininininnninini')
    // if (observerIns) {
    //   return observerIns
    // }
    this.event = {}
    // observerIns = this
  }
  /**
   * 监听事件
   * @param {String} name 监听事件名称
   * @param {Function} fn 监听事件回调
   */
  on(name: string, fn: Function): Observer | Error {
    if (typeof fn !== 'function') {
      return new Error('Parameter error,The second argument must be a function')
    }
    if (!this.event[name]) {
      this.event[name] = []
      this.event[name].push(fn)
    } else {
      this.event[name].push(fn)
    }

    return this
  }
  /**
   * 删除监听事件
   * @param {String} name 关闭监听事件名称
   */
  off(name: string): Observer {
    if (this.event[name]) {
      for (let i in this.event) {
        if (name === i) {
          delete this.event[i]
        }
      }
    }
    return this
  }
  /**
   * 触发事件
   * @param {String} name 触发事件名称
   * @param {[]} arg 参数
   */
  trigger(name: string, arg: any): void {
    if (this.event[name] && Array.isArray(this.event[name])) {
      let event = this.event[name].slice()
      for (let i = 0, len = event.length; i < len; i++) {
        if (typeof event[i] === 'function') {
          event[i].apply(null, [arg])
        }
      }
    }
  }
}
// let ins: Observer
// ins = new Observer()

export default new Observer()
