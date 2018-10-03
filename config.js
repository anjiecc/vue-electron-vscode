// 'use strict'

const path = require('path')
// Mac
const Macoptions = {
  dir: './app',
  name: 'Jcode',
  platform: 'darwin',
  arch: 'x64', // 这就是工作参数 arch
  overwrite: true,
  appVersion: 'Copyright(C) 2017 Qunhe',
  asar: {
    unpackDir: 'plugins' // plugins 内的文件我们不希望打进 asar 格式包内
  },
  out: './dist',
  icon: './icons/logo.ico.icns' // Mac 下 icon 格式是 .icns
}

// Win
const Winoptions = {
  dir: './app',
  name: 'Jcode',
  platform: 'win32', // 不管是 32bit 还是 64bit 的 win，这里都是 win32
  arch: 'x64', // 这里依靠 x64 或 ia32 去区分位数
  overwrite: true,
  asar: {
    unpackDir: 'plugins'
  },
  out: './dist',
  icon: './icons/logo.ico' // Win 下 icon 格式是 .ico
}
let config = {
  // Name of electron app
  // Will be used in production builds
  name: 'Jcode',

  // Use ESLint (extends `standard`)
  // Further changes can be made in `.eslintrc.js`
  eslint: false,

  // webpack-dev-server port
  port: 9080,

  // electron-packager options
  // Docs: https://simulatedgreg.gitbooks.io/electron-vue/content/docs/building_your_app.html
  building: {
    name: 'Jcode',
    arch: 'x64',
    // asar: true,
    asar: {
      unpackDir: 'plugins'
    },
    dir: path.join(__dirname, 'app'),
    icon: path.join(__dirname, 'app/icons/logo'),
    ignore: /\b(src|index\.ejs|icons)\b/,
    out: path.join(__dirname, 'build'),
    overwrite: true,
    // versionStringCompanyName: 'fileSystem',
    // versionStringProductName: 'fileSystem',
    platform: process.env.PLATFORM_TARGET || 'all'
  }
  // build: Macoptions
}

config.building.name = config.name

module.exports = config
