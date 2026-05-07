// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h, watchEffect } from 'vue'
import NeusLogo from '../components/NeusLogo.vue'
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
  }
} satisfies Theme
