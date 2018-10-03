import { Vue } from 'vue-property-decorator'

/**
 * 修改主题class
 * 通过修改状态机theme字段进行更换主题颜色
 */
export default class ThemeMixin extends Vue {
  get themeClass() {
    return {
      'vs-dark-theme': this.theme === 'vs-dark',
      'vs-theme': this.theme === 'vs'
    }
  }
}
