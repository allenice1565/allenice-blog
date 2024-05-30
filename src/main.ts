import router from '@/router/index'
import '@assets/css/tailwind.css'
import { createApp } from 'vue'
import 'vuetify/styles'
import 'bytemd/dist/index.css'
import '@/assets/css/reset.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
