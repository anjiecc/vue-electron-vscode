

<template>
  <div id="container" class="code-view-main" :class="themeClass"></div>
</template>

<script lang="ts">
import * as monaco from 'monaco-editor'
import { State, Mutation } from 'vuex-class'
import { Component, Watch, Prop } from 'vue-property-decorator'
import ThemeVue from '../../mixin/theme.js'
import codeValue from './codeValue.js'
import Observer from '../../util/Observer'
import file from '../../util/file'

@Component({})
export default class CodeView extends ThemeVue {
  @State theme: string
  @State openFileList
  @Mutation setSaveList
  @Mutation setNoSaveList
  @Prop(String) codeContent: string
  @Prop(String) language: string
  @Prop(Object)
  data: {
    codeContent: string
    data: {
      isSave: boolean
      nodeKey: number
      path: string
      title: string
    }
    render: Function
  }
  @Watch('theme', { deep: true })
  watchTheme(newVal, oldVal) {
    if (newVal !== oldVal) {
      monaco.editor.setTheme(newVal)
    }
  }

  name: string = '1'
  monacoEditor: {
    onMouseDown: Function
    onDidChangeModelContent: Function
    getValue: Function
    onKeyDown: Function
  }
  $Modal: {
    confirm: Function
  }
  $Message: {
    success: Function
  }

  triggerEvent(data?: object): void {
    // 点击编辑内容区获取当前行号和列号
    Observer.trigger(
      'onMouseDown',
      data || {
        language: this.language,
        event: {
          target: {
            position: {
              lineNumber: 1,
              column: 1
            }
          }
        }
      }
    )
  }
  mounted() {
    let _ins = this
    // let monacoEditor = null
    setTimeout(() => {
      // 初始化编辑器 (api => https://microsoft.github.io/monaco-editor/api/index.html)
      this.monacoEditor = monaco.editor.create(document.getElementById('container'), {
        value: this.codeContent,
        language: this.language === 'js' ? 'javascript' : this.language || 'javascript',
        theme: this.theme,
        automaticLayout: true
      })
      this.triggerEvent()
      this.monacoEditor.onMouseDown(function(e) {
        _ins.triggerEvent({
          language: _ins.language,
          event: e
        })
      })
      this.monacoEditor.onDidChangeModelContent(function(e) {
        _ins.setNoSaveList(_ins.data.data)
      })
      this.monacoEditor.onKeyDown(function(e) {
        // Ctrl+S 保存文件
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 49) {
          let editCode = _ins.openFileList.filter(t => {
            return t.path === _ins.data.data.path
          })
          // 如果是编辑了没有保存在进行保存操作
          if (editCode && editCode.length && editCode[0].isSave) {
            file.setFileContent(_ins.data.data.path, _ins.monacoEditor.getValue()).then(data => {
              _ins.$Message.success('保存成功!')
              // 更新状态机的数据--保存文件
              _ins.setSaveList({title: _ins.data.data.title, path: _ins.data.data.path})
            })
          }
        }
      })
      // console.log(this.monacoEditor)
    }, 1000)
  }
}
</script>

<style lang="scss">
.code-view-main {
  width: 100%;
  height: 100%;
}
</style>

