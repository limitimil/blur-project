<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="q-py-sm">
          <img src="@/assets/logo/smileBike.svg">
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="hack1">
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
.hack1{
 background-color: hsla(208, 26%, 75%, 1);
}
.hack2{
 background-color: hsla(17, 25%, 33%, 1);
}
.hack3{
 background-color: hsla(203, 16%, 96%, 1);
}
.hack4{
 background-color: hsla(214, 15%, 62%, 1);
}
.hack5{
 background-color: hsla(240, 7%, 47%, 1);
}
</style>
