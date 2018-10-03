/**
 * 获取cookie
 * @param {String} name cookie值
 * @param {String} defaultValue  默认值
 */
export function getCookie<T>(name: string, defaultValue?: T): T | string {
  let arr
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2])
  } else {
    return defaultValue
  }
}
/**
 * 设置cookie
 * @param {String} name cookie名称
 * @param {String} value cookie值
 */
export function setCookie(name: string, value: string) {
  var Days = 30
  var exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toUTCString()
}
/**
 * 删除cookie
 * @param {String} name  cookie名称
 */
export function delCookie(name: string) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name, '')
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString()
  }
}
