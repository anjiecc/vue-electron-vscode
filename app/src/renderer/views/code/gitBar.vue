<template>
    <div class="git-bar tool-bar-title" :class="themeClass">
        <Row class="git-bar-title">
            <Col span="15" class="git-bar-title-name">{{$t('sourceControl')}}</Col>
            <Col span="3">
                <Icon type="md-refresh" />
            </Col>
            <Col span="3">
                <Icon type="md-checkmark" />
            </Col>
            <Col span="3">
                <Dropdown trigger="click">
                <a href="javascript:void(0)">
                    <Icon type="ios-more" />
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>同步</DropdownItem>
                    <DropdownItem>拉取</DropdownItem>
                    <DropdownItem>拉取(变基)</DropdownItem>
                    <DropdownItem>拉取自...</DropdownItem>
                    <DropdownItem>推送</DropdownItem>
                    <DropdownItem>推送到...</DropdownItem>
                    <DropdownItem divided>发布分支</DropdownItem>
                    <DropdownItem divided>全部提交</DropdownItem>
                    <DropdownItem>全部提交(修改)</DropdownItem>
                    <DropdownItem>全部提交(已签名))</DropdownItem>
                    <DropdownItem>已暂存提交(修改)</DropdownItem>
                    <DropdownItem>提交已暂存文件</DropdownItem>
                    <DropdownItem>提交已暂存文件(已签名)</DropdownItem>
                    <DropdownItem>撤销上次提交</DropdownItem>
                    <DropdownItem divided>取消暂存所有更改</DropdownItem>
                    <DropdownItem divided>显示Git输出</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </Col>
        </Row>
        <Input v-model="value" :placeholder="$t('search')" size="small"/>
    </div>
</template>


<script lang="ts">
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import ThemeVue from '../../mixin/theme.js'
@Component({})
export default class GitBar extends ThemeVue {
  @State theme: string
  value: string = ''
}
</script>

<style lang="scss">
.git-bar {
  padding: 0 5px;
  .ivu-input {
    border-radius: 0;
  }
  &-title {
    font-size: 15px;
    padding: 10px 5px;
    .ivu-col-span-3 {
      text-align: right;
      .ivu-dropdown-menu {
        text-align: left;
      }
    }
    &-name {
      font-size: 12px;
      margin-top: 3px;
    }
  }
}
</style>
