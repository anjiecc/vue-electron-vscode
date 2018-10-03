<template>
    <div class="search-bar tool-bar-title" :class="themeClass">
        <Row class="search-bar-title">
            <Col span="15" class="search-bar-title-name">{{$t("search")}}</Col>
            <Tooltip :content="$t('refresh')" placement="bottom">
            <Col span="3">
                <Icon type="md-refresh" />
            </Col>
            </Tooltip>
            <Tooltip :content="$t('collapseAll')" placement="bottom">
            <Col span="3">
                <Icon type="md-reorder" />
            </Col>
            </Tooltip>
            <Tooltip :content="$t('clear')" placement="bottom">
            <Col span="3">
                <Icon type="ios-trash" />
            </Col>
            </Tooltip>
        </Row>
        <Input v-model="value" :placeholder="$t('search')" size="small"/>
    </div>
</template>


<script lang="ts">
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import ThemeVue from '../../mixin/theme.js'
@Component({})
export default class SearchBar extends ThemeVue {
  @State theme: string
  value: string = ''
}
</script>

<style lang="scss">
.search-bar {
  padding: 0 5px;
  .ivu-input {
    border-radius: 0;
  }
  &-title {
    font-size: 15px;
    padding: 10px 5px;
    .ivu-col-span-3 {
      text-align: right;
    }
    &-name {
      font-size: 12px;
    }
  }
}
</style>
