
<template>
    <div class="plugin-bar" :class="themeClass">
       <div class="plugin-bar-title tool-bar-title">
           <div>{{$t("expansion")}}</div>
           <Dropdown trigger="click">
                <a href="javascript:void(0)" class="plugin-bar-title-icon">
                    <Icon type="ios-more" />
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>显示安装的扩展</DropdownItem>
                    <DropdownItem>显示过时的扩展</DropdownItem>
                    <DropdownItem>显示启用的扩展</DropdownItem>
                    <DropdownItem>显示禁用的扩展</DropdownItem>
                    <DropdownItem>显示内置的扩展</DropdownItem>
                    <DropdownItem>显示推荐的扩展</DropdownItem>
                    <DropdownItem>显示常用的扩展</DropdownItem>
                    <DropdownItem divided>排序依据: 安装计数</DropdownItem>
                    <DropdownItem>排序依据: 评分</DropdownItem>
                    <DropdownItem>排序依据: 名称</DropdownItem>
                    <DropdownItem divided>检查更新</DropdownItem>
                    <DropdownItem>禁止自动更新扩展</DropdownItem>
                    <DropdownItem>从VSIX安装...</DropdownItem>
                    <DropdownItem>排序依据: 名称</DropdownItem>
                    <DropdownItem divided>禁用所有扩展</DropdownItem>
                    <DropdownItem disabled>启用所有扩展</DropdownItem>
                </DropdownMenu>
            </Dropdown>
       </div>
       <Collapse v-model="activated">
            <Panel name="1">
                <div class="plugin-bar-item-title">
                    <i>{{$t("enable")}}</i>
                    <i class="plugin-bar-item-title-count">0</i>
                </div>
                <!-- <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p> -->
            </Panel>
            <Panel name="2">
                <div class="plugin-bar-item-title">
                    <i>{{$t("recommend")}}</i><i class="plugin-bar-item-title-count">0</i>
                </div>
                <!-- <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p> -->
            </Panel>
            <Panel name="3">
                <div class="plugin-bar-item-title">
                    <i>{{$t("disable")}}</i><i class="plugin-bar-item-title-count">0</i>
                </div>
                
                <!-- <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p> -->
            </Panel>
        </Collapse> 
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import ThemeVue from '../../mixin/theme.js'
@Component({})
export default class Plugins extends ThemeVue {
  @State theme: string
  activated: string = '1'
}
</script>

<style lang="scss">
.plugin-bar {
  &-title {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 13px;
    border-bottom: 1px solid #dcdee2;
    &-icon {
      font-size: 24px;
      .ivu-icon-ios-more {
        vertical-align: -1px;
      }
    }
  }
  .ivu-collapse-header {
    position: relative;
    padding-left: 10px;
    .ivu-icon {
      vertical-align: 0;
    }
  }
  &-item-title {
    display: inline-block;
    margin-left: -15px;
    &-count {
      position: absolute;
      right: 10px;
    }
  }
  .ivu-collapse {
    border-radius: 0;
    border: 0;
  }
  .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    color: #000;
  }
}
</style>