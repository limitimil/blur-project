import 'quasar/dist/quasar.css'
import '@/styles/quasar.scss'
import lang from 'quasar/lang/zh-TW.js'
import '@quasar/extras/material-icons/material-icons.css'
import { Cookies, LocalStorage } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Cookies,
    LocalStorage,
  },
  lang,
}
