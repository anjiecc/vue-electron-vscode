/*
 * @Author: xa
 * @Date: 2018-08-30 12:10:18
 * @LastEditors: xa
 * @LastEditTime: 2018-09-01 20:46:24
 * @Description: Whatever is worth doing is worth doing well(任何值得做的事就值得把它做好)
 */
const Config = {
  fileType: [
    '.js',
    '.json',
    '.vue',
    '.ts',
    '.tsx',
    '.ejs',
    '.md',
    '.txt',
    '.java',
    '.d.ts',
    '.ico',
    '.icns',
    '.png',
    '.jpg',
    '.jpeg',
    '.bmp',
    '.gif',
    '.svg',
    '.html',
    '.bat',
    '.css',
    '.less',
    '.scss',
    '.lua',
    '.go',
    '.php',
    '.xml',
    '.xsl',
    '.map',
    '.ttf',
    '.woff',
    '.eof'
  ],
  fileTypeReg: /\.(js|json|vue|ts|tsx|ejs|md|txt|java|d\.ts|ico|icns|png|jpg|bmp|gif|svg|html|bat|css|less|scss|lua|go|php|xml|xsl|map|ttf|woff|eot|){1}$/,
  fileIcon: {
    vueIcon: require('../assets/vue.png'),
    jsIcon: require('../assets/JS.png'),
    gitIcon: require('../assets/git.png'),
    htmlIcon: require('../assets/html.png'),
    javaIcon: require('../assets/Java.png'),
    jsonIcon: require('../assets/json.png'),
    mdIcon: require('../assets/md.png'),
    txtIcon: require('../assets/txt.png'),
    tsIcon: require('../assets/typescript.png'),
    babelIcon: require('../assets/babel.png')
  },
  fileMap: {
    js: 'JavaScript',
    html: 'Html',
    css: 'Css'
  }
}

export default Config
