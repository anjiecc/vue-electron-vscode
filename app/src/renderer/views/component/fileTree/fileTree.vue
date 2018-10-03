
<template>
    <Tree class="file-tree" :data="data" :render="renderContent"></Tree>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Config from '../../../util/Config'
import { Mutation, State } from 'vuex-class'
import Observer from '../../../util/Observer'
@Component({})
export default class FileTree extends Vue {
  @Prop(Array) data: Array<Object>
  @Prop(Boolean) open: boolean
  @State openFileList
  @Mutation setOpenFileList
  @Mutation delOpenFileList
  $Modal: {
    confirm: Function
  }
  currentHoverFile = ''
  // 当前tabs激活页签数据
  activedVal = {
    path: ''
  }
  get initActivedVal() {
    // 如果打开文件全部已经关闭重置选择状态
    if (!this.openFileList.length) {
      this.activedVal = Object.assign({}, {path: ''})
    }
    return true
  }
  /**
   * 创建自定义文件树
   */
  renderFileIcon(h, node, data) {
    let _this = this
    if (Config.fileTypeReg.test(data.title) || /^\.+/.test(data.title)) {
      let _matchName = data.title.match(Config.fileTypeReg)
      let _name
      let _dom
      _matchName && (_name = _matchName[1])

      if (Config.fileIcon[`${_name}Icon`]) {
        _dom = h('img', {
          class: ['open-file-icon'],
          attrs: {
            src: Config.fileIcon[`${_name}Icon`]
          }
        })
      } else {
        _dom = h('Icon', {
          props: {
            type: 'ios-paper-outline'
          },
          style: {
            marginRight: '2px',
            verticalAlign: 0,
            fontSize: '16px'
          }
        })
      }

      return h(
        'div',
        {
          on: {
            mouseenter() {
              _this.currentHoverFile = data.path
            },
            mouseleave() {
              _this.currentHoverFile = ''
            }
          }
        },
        [this.renderDelFile(h, data), _dom, h('span', { class: ['open-file-name'], attrs: { title: data.path } }, data.title)]
      )
    }
    return h('span', [
      h('Icon', {
        props: {
          type: 'ios-folder-outline'
        },
        style: {
          marginRight: '8px'
        }
      }),
      h('span', { class: ['open-file-folder-name'], attrs: { title: data.path } }, data.title)
    ])
  }
  /**
   * 自定义渲染内容 详细参考iview官网树组件(https://www.iviewui.com/components/tree)
   */
  renderContent(h, { root, node, data }) {
    let _this = this
    return h(
      'span',
      {
        class: ['open-file-folder', _this.activedVal.path === data.path ? 'open-file-actived' : ''],
        style: {
          display: 'inline-block',
          width: '100%'
        },
        on: {
          click() {
            // 打开文件
            if (!data.children && _this.open) {
              _this.setOpenFileList({ title: data.title, path: data.path, isSave: false })
            }
            // 点击打开的文件进行tabs对应切换
            if (!data.children && !_this.open) {
              for (let i = 0, len = _this.openFileList.length; i < len; i++) {
                if (_this.openFileList[i].path === data.path) {
                  Observer.trigger('activedChange', i + '')
                  break
                }
              }
            }
          }
        }
      },
      [this.renderFileIcon(h, node, data)]
    )
  }
  renderDelFile(h, data) {
    let _this = this
    if (!this.open) {
      return h('Icon', {
        props: {
          type: this.currentHoverFile === data.path ? 'ios-close' : ''
        },
        style: {
          width: '20px',
          height: '20px',
          marginRight: '2px',
          verticalAlign: '-2px',
          fontSize: '20px'
        },
        on: {
          click() {
            Observer.trigger('closeFile', data)
          }
        }
      })
    }
  }
  mounted() {
    Observer.on('activedTabsChange', data => {
      this.openFileList[data] && (this.activedVal = this.openFileList[data])
    })
  }
}
</script>

<style lang="scss">
.file-tree {
  padding: 5px 0;
  .ivu-tree-empty {
    text-align: center;
    font-size: 13px;
    padding: 10px 0;
  }
  .open-file-folder {
    display: inline-block;
    padding: 4px 2px;
    &:hover {
      background: rgba(45, 140, 240, 0.4);
      color: #fff;
      cursor: pointer;
    }
  }
  .open-file-actived {
    background: rgba(45, 140, 240, 0.4);
    color: #fff;
  }
  .open-file-icon {
    width: 15px;
    height: 15px;
  }
  .open-file-name {
    margin-left: 5px;
    vertical-align: 3px;
  }
  .ivu-tree-children {
    li {
      margin: 0;
    }
  }
}
</style>