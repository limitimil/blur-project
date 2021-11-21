<template>
  <div class="fit row justify-between  q-py-md q-px-lg">
    <div class="self-start">search bar</div>
    <div class="self-end">
      <a href="javascript:;" @click="toMyLocation">
        <img src="@/assets/icon/gpsLocationCta.svg" style="width: 95px; height: 95px;" />
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import gMapStore from '@/components/_week2Utils/store/gMap'
import bikeStationStore from '@/store/bikeStation'

const DEFAULT_CITY = 'Taipei'
export default {
  name: 'LayoutDefault',

  components: {},
  props: ['city'],

  // @ts-ignore
  setup() {
    const router = useRoute()
    const calculateCenter = () => gMapStore.getters.map.getCenter()
    onMounted(() => {
      bikeStationStore.commit('appendQuery', { city: router.query.city || DEFAULT_CITY })
    })

    return {
      bikeStationStore,
      toMyLocation: async () => {
        await gMapStore.dispatch('centerByMyLocation')
        const currentPosition = calculateCenter()
        bikeStationStore.commit('appendQuery', { position: currentPosition })
        return bikeStationStore.dispatch('top')
      },
    }
  },
}
</script>
<style scoped lang="less">
</style>
