
<template>
    <div class="file-bar" :class="themeClass" :style="fileBarStyle">
       <div class="file-bar-title tool-bar-title">{{$t("resourceManager")}}</div>
       <Collapse v-model="activated">
            <Panel name="1" :style="collapseOneStyle">
                <i class="file-bar-item-title">{{$t("openEditor")}}</i>
                <fileTree slot="content" :data="openFileData"></fileTree>
            </Panel>
            <Panel name="2" :style="collapseTwoStyle">
                <i class="file-bar-item-title">{{$t("projectName")}}</i>
                <fileTree slot="content" :data="fileData" :open="true"></fileTree>
            </Panel>
            <Panel name="3" :style="collapseThreeStyle">
                <i class="file-bar-item-title">{{$t("outline")}}</i>
                <fileTree slot="content" :data="outlineData"></fileTree>
                <!-- <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p> -->
            </Panel>
        </Collapse> 
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import ThemeVue from '../../mixin/theme.js'
import fileTree from '../component/fileTree/fileTree.vue'
import Observer from '../../util/Observer'
import Config from '../../util/Config'

@Component({
  components: { fileTree }
  })
export default class FileBar extends ThemeVue {
  @State theme: string
  @State openFileList: Array<any>
  @State fileList: Array<object>
  @Mutation setFileList
  @Prop(Number) height: number
  @Watch('height')
  onHeightChange(newValue: number, oldVlaue: number) {
    // console.log(newValue, oldVlaue)
  }

  activated = ['2']
  outlineData = []
  get fileBarStyle() {
    return { height: this.height + 'px' }
  }
  // 折叠框高度控制
  get collapseOneStyle() {
    if (this.activated.length === 1 && this.activated[0] === '1') {
      return {
        height: 'calc(100% - 60px)'
      }
    }
    if (this.activated.length && this.activated.indexOf('1') > -1) {
      return {
        height: '20%'
      }
    }
  }
  // 折叠框高度控制
  get collapseTwoStyle() {
    if (this.activated.length === 1 && this.activated[0] === '2') {
      return {
        height: 'calc(100% - 60px)'
      }
    }
    if (this.activated.length === 2 && this.activated.indexOf('2') > -1) {
      return {
        height: 'calc(80% - 40px)'
      }
    }
    if (this.activated.length === 3 && this.activated.indexOf('2') > -1) {
      return {
        height: '60%'
      }
    }
  }
  // 折叠框高度控制
  get collapseThreeStyle() {
    if (this.activated.length === 1 && this.activated[0] === '3') {
      return {
        height: 'calc(100% - 60px)'
      }
    }
    if (this.activated.length && this.activated.indexOf('3') > -1) {
      return {
        height: '20%'
      }
    }
  }
  // 已打开文件列表
  get openFileData() {
    if (this.openFileList.length && this.activated.indexOf('1') < 0) {
      this.activated.push('1')
    }
    return this.openFileList
  }
  // 文件树列表
  get fileData() {
    return this.fileList
  }
  mounted() {
    let _this = this
    // 监听打开文件事件
    Observer.on('file-select', data => {
      _this.setFileList(data.slice(0))
    })
  }
}
</script>

<style lang="scss">
.file-bar {
  &-title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 13px;
    border-bottom: 1px solid #dcdee2;
  }
  &-item-title {
    margin-left: -15px;
  }
  .ivu-collapse {
    border-radius: 0;
    border: 0;
    overflow: hidden;
    height: calc(100% - 30px);
  }
  .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    color: #000;
  }
  .ivu-collapse-content-box {
    padding: 0;
  }
  .ivu-collapse-content {
    padding: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(100% - 20px);
  }
  .ivu-collapse-item {
    transition: all 0.3s ease-out;
    overflow: hidden;
  }
}
</style>