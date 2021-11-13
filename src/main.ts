import { createApp } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'
import router from './router'
import store from './store'
import travelStore from './store/travel'
import quasarUserOptions from '@/plugins/quasar-user-options'

createApp(App).use(Quasar, quasarUserOptions).use(store).use(router)
  .use(travelStore)
  .mount('#app')
