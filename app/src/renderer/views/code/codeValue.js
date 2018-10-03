export default `
import Observable from '@/utils/Observer'
import XLSX from 'xlsx'

/**
 * 导出excel类
 */
export default class Export2excel extends Observable {
  constructor() {
    super()
  }
  /**
   * 设置导出类型
   * @param {String} type 类型('xlsx', 'csv', 'ods', 'xlsb', 'fods', 'biff2')
   */
  setFormatType(type = "xlsx") {
    this.formatType = { bookType: type, bookSST: false, type: 'binary' }
  }
  /**
   * 设置sheet名称
   * @param {String | Array} sheetName sheet名称
   */
  setSheetName(sheetName) {
    let _options = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} }

    if (Array.isArray(sheetName)) {
      _options.SheetNames = sheetName.slice()
    }

    if (sheetName && typeof sheetName === 'string') {
      _options.SheetNames[0] = sheetName
    }

    this.sheetOptions = _options
  }
  /**
   * 设置导出数据
   * @param {Array} data 导出数据
   */
  setSheetData(data) {
    // 如果导出数据为二维数组,就创建多个sheet
    if (data.length && Array.isArray(data[0])) {
      data.forEach((item, index) => {
        this.sheetOptions.Sheets[this.sheetOptions.SheetNames[index]] = XLSX.utils.json_to_sheet(item)
      })
    } else {
      this.sheetOptions.Sheets[this.sheetOptions.SheetNames[0]] = XLSX.utils.json_to_sheet(data)
    }
  }
  /**
   * 创建buffer
   * @param {Array} s 
   */
  createBuffer(s) {
    if (typeof ArrayBuffer !== 'undefined') {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    } else {
      var buf = new Array(s.length);
      for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
  }
  /**
   * 设置导出文件名称
   * @param {String} fileName 导出文件名称
   */
  setExportTableName(fileName = "download") {
    
  }
  /**
   * 封装ajax
   * @param {String} url 请求地址
   * @param {Object | String} config 参数
   */
  $http(url = '', config = {}) {
    let params = {}
    if (typeof config === 'string') {
      params = {
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    }

    let def = $.Deferred()
    $.extend(params, { url: url, type: 'post' }, { data: config })
    $.ajax(params)
      .done(rep => {
        if (rep) {
          def.resolve(rep)
        } else {
          def.reject()
        }
      })
      .fail(e => {
        def.reject(e)
      })
    return def.promise()

  }
  /**
   * 封装form提交
   * @param {String} url 请求地址
   * @param {Object} params  请求参数
   */
  $form(url, params) {
    let $form = document.createElement('form')
    $form.action = url
    for (let key in params) {
      let input = document.createElement('input')
      input.name = key
      input.value = params[key]
      $form.appendChild(input)
    }
    $form.target = '_blank'
    $form.acceptCharset = 'UTF-8'
    $form.enctype = 'application/x-www-form-urlencoded'
    $form.method = 'post'
    $form.style.display = 'none'

    document.body.appendChild($form)
    $form.submit()
  }
  /**
   * 下载文件
   * @param {*} _blob 
   */
  download(_blob) {
    // application/octet-stream
    // application/vnd.ms -excel
    //创建a标签模拟下载
    let _a = document.createElement("a");
    _a.download = this.fileName || "下载.xls"
    _a.href = URL.createObjectURL(_blob)
    // 模拟点击下载文件
    _a.click()

    setTimeout(function () {
      URL.revokeObjectURL(_blob);
    }, 100);
  }
  /**
   * 导出表格并且下载
   * @param {Object}} config 导出配置文件
   * @param {Array} data 导出数据
   */
  export2excel(config, data) {
    // 如果没有数据就不进行下载操作 
    if (!data || !data.length) {
      return false
    }
    // 初始化一些参数
    this.setFormatType(config.type)
    this.setSheetName(config.sheetName)
    this.setSheetData(data)
    this.setExportTableName(config.fileName)

    let xlsxWrite = XLSX.write(this.sheetOptions, this.formatType)
    let buff = this.createBuffer(xlsxWrite)
    let _blob = new Blob([buff], { type: "application/octet-stream" })
    this.download(_blob)
  }
  /**
   * 异步获取后台流文件进行导出下载
   * @param {*} buf 
   * @param {*} options 
   */
  asyncExport2excel(url, options) {
    let _this = this
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (this.status === 200) {
          let blob = this.response;
          _this.fileName = options.fileName
          _this.download(blob)
          resolve()
        } else {
          reject()
        }
      };
      xhr.send(JSON.stringify(options.params))
    })
  }
}
`
