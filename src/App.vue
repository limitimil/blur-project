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
import Drawer from './views/Drawer.vue'

export default {
  name: 'LayoutDefault',

  data() {
    return {
      showDrawerAndHeader: false,
    }
  },
  components: {
    Drawer,
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    }
  },
  created() {
    this.showDrawerAndHeader = this.$cookie.getCookie('devMode') === 'true'
  },
}
</script>
