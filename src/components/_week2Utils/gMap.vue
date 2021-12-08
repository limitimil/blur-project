<template>
  <div class="card-container">
    <div class="map" id="map"></div>
    <CenterByLocation @click="center"></CenterByLocation>
  </div>
</template>

<script lang="js">
import { onMounted, defineComponent } from 'vue'
import store from './store/gMap'

// TODO: rearrange this components and the following dependencies
import CenterByLocation from '@/components/_week3Utils/map/CenterByLocation.vue'

export default defineComponent({
  name: 'LayoutDefault',

  emits: ['on-center'],
  components: {
    CenterByLocation,
  },

  setup(props, { emit }) {
    onMounted(() => {
      store.dispatch('initMap', 'map')
    })
    return {
      center: async () => {
        await store.dispatch('centerByMyLocation')
        emit('on-center')
      },
    }
  },
})

</script>
<style scoped lang="less">
.card-container {
  position: relative;
  min-height: 500px;
}

.map {
  position: absolute !important;
  width: 100%;
  height: 100%;
}

</style>
