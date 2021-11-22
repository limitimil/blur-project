<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="q-py-sm">
          <img src="@/assets/logo/smileBike.svg">
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <GMap class="filled-google-map"></GMap>
        <router-view class="overlay-google-map"/>
      </q-page>
    </q-page-container>

  </q-layout>
</template>
<script lang="ts">
import GMap from '@/components/_week2Utils/gMap.vue'

export default {
  name: 'LayoutDefault',

  components: {
    GMap,
  },

  setup() {
    return {
    }
  },
}

</script>
<style scoped lang="less">
.filled-google-map {
  position: absolute;
  height: 100%;
}
</style>
