<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy" v-if="showDrawerAndHeader">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

      </q-toolbar>
    </q-header>

    <Drawer v-model="leftDrawerOpen" v-if="showDrawerAndHeader"/>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import Drawer from './views/Drawer.vue'

export default {
  name: 'LayoutDefault',

  components: {
    Drawer,
  },

  setup() {
    const $q = useQuasar()
    const showDrawerAndHeader = true
    return {
      leftDrawerOpen: ref(false),
      showDrawerAndHeader,
    }
  },
}
</script>
<style>
.q-field__inner, .q-menu {
  background: #FFFFFF;
  border: 2px solid #4E4E4E;
  box-sizing: border-box;
  border-radius: 20px !important;
}
.q-field__native {
  font-size: 30px !important;
  line-height: 41px;
  letter-spacing: 0.02em;
  color: #D2D2D2 !important;
}
.q-field__label {
  line-height: 41px;
  letter-spacing: 0.1em;
  color: #4E4E4E !important;
}
.q-field--outlined .q-field__control:before,
.q-field--standard .q-field__control:before {
  border: none !important;
}
</style>
