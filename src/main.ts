import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { VueCookieNext } from 'vue-cookie-next'
import App from './App.vue'
import router from './router'
import store from './store'
import quasarUserOptions from '@/plugins/quasar-user-options'

createApp(App).use(Quasar, quasarUserOptions).use(store).use(router)
  .use(VueCookieNext)
  .mount('#app')
