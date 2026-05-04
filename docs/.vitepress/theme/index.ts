// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h, watchEffect } from 'vue'
import ActionsDemo from '../components/ActionsDemo.vue'
import ButtonDemo from '../components/ButtonDemo.vue'
import CalendarDemo from '../components/CalendarDemo.vue'
import CardDemo from '../components/CardDemo.vue'
import CheckboxDemo from '../components/CheckboxDemo.vue'
import ClockDemo from '../components/ClockDemo.vue'
import DataTableDemo from '../components/DataTableDemo.vue'
import DateInputDemo from '../components/DateInputDemo.vue'
import DropdownDemo from '../components/DropdownDemo.vue'
import FileUploaderDemo from '../components/FileUploaderDemo.vue'
import IconButtonDemo from '../components/IconButtonDemo.vue'
import InputDemo from '../components/InputDemo.vue'
import LinkDemo from '../components/LinkDemo.vue'
import MenuDemo from '../components/MenuDemo.vue'
import ModalDemo from '../components/ModalDemo.vue'
import MultiSelectDemo from '../components/MultiSelectDemo.vue'
import NeusLogo from '../components/NeusLogo.vue'
import SelectDemo from '../components/SelectDemo.vue'
import TimeInputDemo from '../components/TimeInputDemo.vue'
import WeekCalendarDemo from '../components/WeekCalendarDemo.vue'
import WeekCalendarRowDemo from '../components/WeekCalendarRowDemo.vue'
import './style.css'

function SyncColorScheme() {
  const { isDark } = useData()
  watchEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute(
      'data-color-scheme',
      isDark.value ? 'dark' : 'light'
    )
  })
  return h('span', { style: 'display:none' })
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(NeusLogo),
      'layout-top': () => h(SyncColorScheme),
    })
  },
  enhanceApp({ app }) {
    app.component('NeusLogo', NeusLogo)
    app.component('ButtonDemo', ButtonDemo)
    app.component('ActionsDemo', ActionsDemo)
    app.component('CalendarDemo', CalendarDemo)
    app.component('CardDemo', CardDemo)
    app.component('CheckboxDemo', CheckboxDemo)
    app.component('ClockDemo', ClockDemo)
    app.component('DataTableDemo', DataTableDemo)
    app.component('DateInputDemo', DateInputDemo)
    app.component('DropdownDemo', DropdownDemo)
    app.component('FileUploaderDemo', FileUploaderDemo)
    app.component('IconButtonDemo', IconButtonDemo)
    app.component('InputDemo', InputDemo)
    app.component('LinkDemo', LinkDemo)
    app.component('MenuDemo', MenuDemo)
    app.component('ModalDemo', ModalDemo)
    app.component('MultiSelectDemo', MultiSelectDemo)
    app.component('SelectDemo', SelectDemo)
    app.component('TimeInputDemo', TimeInputDemo)
    app.component('WeekCalendarDemo', WeekCalendarDemo)
    app.component('WeekCalendarRowDemo', WeekCalendarRowDemo)
  }
} satisfies Theme
