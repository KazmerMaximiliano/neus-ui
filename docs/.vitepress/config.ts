import { defineConfig } from 'vitepress'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [react()],
    resolve: {
      alias: {
        '@neus-ui/src': path.resolve(__dirname, '../../src'),
      },
    },
    ssr: {
      noExternal: ['react', 'react-dom', 'react-spinners'],
    },
  },
  title: "NEUS UI",
  description: "A modern React UI component library built with TypeScript and dynamic theming capabilities.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/introduction' },
      { text: 'Components', link: '/components' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Installation', link: '/installation' },
          { text: 'Theming', link: '/theming' },
          { text: 'Testing', link: '/testing' },
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Design System', link: '/design-system' },
          { text: 'All Components', link: '/components' },
        ]
      },
      {
        text: 'Components',
        collapsed: false,
        items: [
          { text: 'Actions', link: '/components/Actions' },
          { text: 'Button', link: '/components/Button' },
          { text: 'Calendar', link: '/components/Calendar' },
          { text: 'Card', link: '/components/Card' },
          { text: 'Checkbox', link: '/components/Checkbox' },
          { text: 'Clock', link: '/components/Clock' },
          { text: 'ClockNumbers', link: '/components/ClockNumbers' },
          { text: 'DataTable', link: '/components/DataTable' },
          { text: 'DateInput', link: '/components/DateInput' },
          { text: 'Dropdown', link: '/components/Dropdown' },
          { text: 'FileUploader', link: '/components/FileUploader' },
          { text: 'IconButton', link: '/components/IconButton' },
          { text: 'Input', link: '/components/Input' },
          { text: 'InteractiveMap', link: '/components/InteractiveMap' },
          { text: 'Link', link: '/components/Link' },
          { text: 'Menu', link: '/components/Menu' },
          { text: 'Modal', link: '/components/Modal' },
          { text: 'MultiSelect', link: '/components/MultiSelect' },
          { text: 'Select', link: '/components/Select' },
          { text: 'Sidebar', link: '/components/Sidebar' },
          { text: 'TimeInput', link: '/components/TimeInput' },
          { text: 'WeekCalendar', link: '/components/WeekCalendar' },
          { text: 'WeekCalendarRow', link: '/components/WeekCalendarRow' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
