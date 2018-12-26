import * as Vue from 'vue'
declare module 'vue/types/options' {
  export interface ComponentOptions<V extends Vue> {
    i18n?: any
  }
}
