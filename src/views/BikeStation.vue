<template>
  <main class="search-bar q-mt-md q-ml-lg row">
    <q-btn
      flat
      dense
      round
      @click="()=>{console.log('clicked')}"
      icon="menu"
      ></q-btn>
    <q-input v-model="keyword">
      <template v-slot:append>
        <span class="q-mr-xs">|</span>
        <a href="javascript:;" @click="top">
          <q-icon name="search"/>
        </a>
      </template>
    </q-input>
    <div class="card-container">
      <Card  v-for="item in data" :key="item.ID" :value="item" />
    </div>
  </main>
  <main class="gps-cta q-mb-md q-mr-lg">
    <a href="javascript:;" @click="toMyLocation">
      <img src="@/assets/icon/gpsLocationCta.svg" style="width: 95px; height: 95px;" />
    </a>
  </main>
</template>
<script lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import gMapStore from '@/components/_week2Utils/store/gMap'
import bikeStationStore from '@/store/bikeStation'
import Card from '@/components/_storyUtils/Card.vue'

const DEFAULT_CITY = 'Taipei'
export default {
  name: 'LayoutDefault',

  components: {
    Card,
  },
  props: ['city'],

  // @ts-ignore
  setup() {
    const router = useRoute()
    const keyword = ref('')
    const calculateCenter = () => gMapStore.getters.map.getCenter()
    onMounted(() => {
      bikeStationStore.commit('appendQuery', { city: router.query.city || DEFAULT_CITY })
    })

    return {
      bikeStationStore,
      // computed
      data: computed(() => bikeStationStore.getters.content),
      keyword,

      // methods
      top: () => {
        bikeStationStore.commit('appendQuery', { keyword })
        bikeStationStore.dispatch('top')
      },
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
main {
  z-index: 1000003;
  position: absolute;
}
.search-bar {
  max-width: 50vw;
  .card-container {
    max-height: 50vh;
    overflow-y: auto;
  }
}
.gps-cta {
  right: 0;
  bottom: 0;
}
</style>
