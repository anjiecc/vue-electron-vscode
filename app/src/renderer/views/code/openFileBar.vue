<template>
  <Tabs class="open-file" :class="themeClass" v-model="activedTabs" @on-click="tabsClick" ref="openFileTabs">
    <TabPane :label="item.render" v-for="(item, index) in openList" :key="Math.random()" :name="index + ''">
      <keep-alive>
        <code-view v-if="activedTabs == index" :ref="'codeView' + index" :code-content="item.codeContent" :language="item.language" :data="item"></code-view>
      </keep-alive>
    </TabPane>
  </Tabs>
</template>


<script lang="ts">
// import Component from "vue-class-component";
import { Component, Watch, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import ThemeVue from '../../mixin/theme.js'
import codeView from './codeView.vue'
import Config from '../../util/Config'
import file from '../../util/file'
import Observer from '../../util/Observer'

@Component({
  components: { codeView }
  })
export default class OpenFileBar extends ThemeVue {
  @State theme
  @State openFileList
  @Mutation delOpenFileList
  @Watch('activedTabs')
  onActivedTabsChange(newValue: string, oldValue: string) {
    Observer.trigger('activedTabsChange', newValue)
  }

  $Modal: {
    confirm: Function
  }
  $Message: {
    success: Function
  }
  activedTabs = '0'
  currentHoverFile = ''

  get openList() {
    let _this = this
    if (this.openFileList.length === 1) {
      Observer.trigger('activedTabsChange', '0')
    }
    return this.openFileList.map(item => {
      let _matchName = item.title.match(Config.fileTypeReg)
      let _name
      _matchName && (_name = _matchName[1])

      return {
        render: h => {
          return h('div', [
            h('img', {
              class: ['open-file-vue-icon'],
              attrs: {
                src: Config.fileIcon[`${_name}Icon`]
              }
            }),
            h('span', { class: ['open-file-name'] }, item.title),
            h('Icon', {
              props: {
                type: item.isSave ? (_this.currentHoverFile === item.path ? 'md-close' : 'ios-tennisball') : 'md-close' // ios-radio-button-on
              },
              style: {
                marginLeft: '12px',
                marginRight: 0,
                fontWeight: 900,
                fontSize: '12px',
                verticalAlign: '2px'
              },
              nativeOn: {
                click(e) {
                  e.stopPropagation()
                  _this.saveCodeFile(item)
                },
                mouseenter() {
                  _this.currentHoverFile = item.path
                },
                mouseleave() {
                  _this.currentHoverFile = ''
                }
              }
            })
          ])
        },
        codeContent: file.getFileContent(item.path),
        language: _name,
        data: item
      }
    })
  }
  // 点击tabs页签触发对应事件
  tabsClick() {
    let tabsRefs = this.$refs.openFileTabs
    Observer.trigger('activedTabsChange', (tabsRefs as any).activeKey)
    Observer.on('activedChange', data => {
      this.activedTabs = data
    })
  }
  saveCodeFile(item) {
    let _this = this
    let closeData = _this.openFileList.filter(t => {
      return t.path === item.path
    })
    if (closeData && closeData.length && closeData[0].isSave) {
      _this.$Modal.confirm({
        title: `是否要保存对 ${item.title} 的更改？`,
        content: '<p>如果不保存，更改将丢失。</p>',
        okText: '保存',
        cancelText: '不保存',
        onOk: () => {
          let content = _this.$refs[`codeView${_this.activedTabs}`][0].monacoEditor.getValue()
          file.setFileContent(item.path, content).then(data => {
            _this.$Message.success('保存成功!')
            _this.delOpenFileList(item.path)
          })
        },
        onCancel: () => {
          _this.delOpenFileList(item.path)
        }
      })
    } else {
      _this.delOpenFileList(item.path)
    }
    // 关闭文件默认回到第一个页签
    _this.activedTabs = '0'
  }
  mounted() {
    // 关闭文件
    Observer.on('closeFile', data => {
      this.saveCodeFile(data)
    })
  }
}
</script>

<style lang="scss">
.open-file {
  height: 100%;
  &-name {
    margin-left: 5px;
    //  font-size: 16px;
    vertical-align: 3px;
  }
  &-vue-icon {
    width: 15px;
    height: 15px;
  }
  .ivu-tabs-content {
    height: 100%;
  }
  .ivu-tabs-tab {
    //  font-weight: 600;
  }
  .ivu-tabs-nav .ivu-tabs-tab {
    padding: 8px 5px 8px 16px;
  }
}
</style>
