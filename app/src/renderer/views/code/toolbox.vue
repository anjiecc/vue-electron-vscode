<template>
  <ul :class="themeClass" class="toolbox">
    <li @click="changeTool(item.name)" v-for="(item,index) in toolBoxList" :key="index" :class="item.class">
      <Tooltip :content="item.title" placement="right">
        <Icon :type="item.icon" />
      </Tooltip>
    </li>
    <Dropdown class="toolbox-setting" trigger="click">
      <Icon type="md-settings" />
      <DropdownMenu slot="list">
        <DropdownItem>命令面板</DropdownItem>
        <DropdownItem>设置</DropdownItem>
        <DropdownItem>键盘快捷方式</DropdownItem>
        <DropdownItem>管理扩展</DropdownItem>
        <DropdownItem>用户代码片段</DropdownItem>
        <Dropdown placement="right-start">
          <DropdownItem>
            颜色主题
            <Icon type="ios-arrow-forward"></Icon>
          </DropdownItem>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="changeThemeFn('vs')">vs</DropdownItem>
            <DropdownItem @click.native="changeThemeFn('vs-dark')">vs-dark</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="right-start">
          <DropdownItem>
            语言
            <Icon type="ios-arrow-forward"></Icon>
          </DropdownItem>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="changeLanguage('zh')">中文</DropdownItem>
            <DropdownItem @click.native="changeLanguage('en')">English</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <DropdownItem>检查更新...</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </ul>
</template>

<script lang="ts">
import { Component, Emit } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import ThemeVue from '../../mixin/theme.js'
import { setCookie } from '../../util/cookie'
import file from '../../util/file'
import Observer from '../../util/Observer'
import Config from '../../util/Config'
// const $event = new Observer()
@Component({})
export default class Toolbox extends ThemeVue {
  @State theme: string
  @Mutation setTheme
  @Emit()
  /**
   * $emit 切换工具菜单 向上广播事件
   */
  changeTool(data: string) {
    let _this = this
    if (data === 'file') {
      let _openFile = this.createFileDom()
      _openFile.click()

      _openFile.addEventListener('change', function() {
        // console.log(this.files[0].path)
        file.getFolder(this.files[0].path).then(data => {
          Observer.trigger('update-file', { data: data, path: this.files[0].path })
        })
      })
    }
  }

  toolBoxList = [
    {
      title: '打开文件',
      name: 'file',
      icon: 'ios-folder-open'
    },
    {
      title: '搜索文件',
      name: 'search',
      icon: 'ios-search'
    },
    {
      title: 'Git',
      name: 'git',
      icon: 'md-git-network'
    },
    {
      title: '调式',
      name: 'debug',
      icon: 'ios-bug'
    },
    {
      title: '插件',
      name: 'plugin',
      icon: 'ios-cube'
    }
    // {
    //   title: "设置",
    //   name: "setting",
    //   icon: "md-settings",
    //   class: "toolbox-setting"
    // }
  ]
  treeData = []
  /**
   * 递归构造文件树
   */
  createTreeData(data: any, path: string, treeData = []): void {
    data.forEach(item => {
      if (Config.fileTypeReg.test(item)) {
        treeData.push({
          title: item,
          path: `${path}/${item}`
        })
      } else {
        if (file.isDirectory(`${path}/${item}`)) {
          let children = []
          let _f = file.getFolderSync(`${path}/${item}`)
          _f && this.createTreeData(_f, `${path}/${item}`, children)
          treeData.push({
            title: item,
            expand: false,
            children: children,
            path: `${path}/${item}`
          })
        } else {
          treeData.push({
            title: item,
            path: `${path}/${item}`
          })
        }
      }
    })
  }
  createFileDom() {
    let inputObj = document.createElement('input')

    inputObj.setAttribute('id', '_ef')
    inputObj.setAttribute('type', 'file')
    inputObj.setAttribute('webkitdirectory', 'true')
    inputObj.setAttribute('directory', 'true')
    inputObj.setAttribute('multiple', 'true')
    inputObj.setAttribute('style', 'visibility:hidden')
    document.body.appendChild(inputObj)
    return inputObj
  }
  /**
   * 初始化国际化
   */
  init$i18n() {
    // typescript在data里面this是指向data函数，里面拿不到$i18n,在mounted里面可以拿到所以暂时这样处理 20180806
    let _$i18n = [
      {
        name: 'file',
        i18n: (this as any).$t('openfile')
      },
      {
        name: 'search',
        i18n: (this as any).$t('searchfile')
      },
      {
        name: 'debug',
        i18n: (this as any).$t('debug')
      },
      {
        name: 'plugin',
        i18n: (this as any).$t('plugin')
      }
    ]

    for (let i = 0, len = _$i18n.length; i < len; i++) {
      for (let j = 0, llen = this.toolBoxList.length; j < llen; j++) {
        if (_$i18n[i].name === this.toolBoxList[j].name) {
          this.$set(this.toolBoxList[j], 'title', _$i18n[i].i18n)
        }
      }
    }
  }
  /**
   * 改变主题
   */
  changeThemeFn(thmem) {
    this.setTheme(thmem)
  }
  /**
   * 切换语言
   */
  changeLanguage(lan) {
    setCookie('lan', lan)
    window.location.reload()
  }
  mounted() {
    let _this = this
    this.init$i18n()
    Observer.on('update-file', function(data) {
      _this.treeData = []
      _this.createTreeData(data.data, data.path, _this.treeData)
      Observer.trigger('file-select', _this.treeData)
    })
  }
}
</script>

<style lang="scss">
.toolbox {
  height: 100%;
  width: 40px;
  border-right: 1px solid #dcdee2;
  position: relative;
  li {
    font-size: 25px;
    padding: 10px 5px;
    &:hover {
      cursor: pointer;
    }
  }
  &-setting {
    position: absolute;
    bottom: 10px;
    font-size: 25px;
    padding: 10px 5px;
    &:hover {
      cursor: pointer;
    }
    .ivu-dropdown-item {
      text-align: center;
    }
  }
}
</style>