<template>
  <div class="code-main" :class="themeClass">
    <toolbox @change-tool="changeTool"></toolbox>
    <Split v-model="split1" class="code-main-file-panel">
      <div slot="left" class="code-main-left-wrap">
        <file-bar v-if="currentBar === 'file'" :height="fileHeight"></file-bar>
        <search-bar v-if="currentBar === 'search'" :height="fileHeight"></search-bar>
        <plugin-bar v-if="currentBar === 'plugin'" :height="fileHeight"></plugin-bar>
        <git-bar v-if="currentBar === 'git'" :height="fileHeight"></git-bar>
      </div>
      <div slot="right" class="code-main-split-right">
        <Split v-model="split2" mode="vertical">
          <div slot="top" class="code-main-split-pane code-main-split-pane-top">
            <open-file-bar></open-file-bar>
            <!-- <code-view></code-view> -->
          </div>
          <div slot="bottom" class="code-main-split-pane code-main-split-pane-bottom">
            {{$t("console")}}
          </div>
        </Split>
      </div>
    </Split>
    <div class="code-main-footer-tool">
      <ul class="code-main-footer-tool-left">
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <ul class="code-main-footer-tool-right">
        <li>行 <i>{{codeFooterData.position.lineNumber}}</i></li>
        <li>列 <i>{{codeFooterData.position.column}}</i></li>
        <!-- <li>空格: <i></i></li> -->
        <li>LF</li>
        <li>UTF-8</li>
        <li>{{codeFooterData.language}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
// import Component from "vue-class-component";
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import ThemeVue from '../../mixin/theme.js'
import Observer from '../../util/Observer'
import Config from '../../util/Config'
import fileBar from './fileBar.vue'
import searchBar from './search.vue'
import toolbox from './toolbox.vue'
import openFileBar from './openFileBar.vue'
import pluginBar from './pluginBar.vue'
import gitBar from './gitBar.vue'
@Component({
  components: { fileBar, toolbox, openFileBar, searchBar, pluginBar, gitBar }
  })
export default class Code extends ThemeVue {
  @State theme: string

  split1: number = 0.2
  split2: number = 0.9
  currentBar: string = 'file'
  fileHeight = 0
  codeFooterData = {
    position: {
      lineNumber: 1,
      column: 1
    },
    language: 'JavaScript'
  }
  changeTool(value) {
    this.currentBar = value
  }
  mounted() {
    let _this = this
    let _w = document.querySelector('.code-main-file-panel')
    let _h = (_w as any).offsetHeight
    this.fileHeight = _h

    Observer.on('onMouseDown', function(data) {
      _this.codeFooterData.position = data.event.target.position
      _this.codeFooterData.language = Config.fileMap[data.language]
    })
  }
}
</script>


<style lang="scss">
@import '../../theme/theme';

.code-main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  &-split-right {
    height: 100%;
  }
  &-split-pane {
    padding: 10px;
  }
  &-split-pane-top {
    height: 100%;
  }
  .ivu-split-pane.left-pane {
    // overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-footer-tool {
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    z-index: 99;
    border-top: 1px solid;
    &-right {
      list-style: none;
      display: flex;
      justify-content: space-between;
      li {
        padding: 0 6px;
      }
    }
  }
}
</style>

