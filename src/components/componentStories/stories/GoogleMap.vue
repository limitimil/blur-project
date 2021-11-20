<template>
  <div class="row">
    <div class="col"><q-btn @click="toMyLocation">my location</q-btn></div>
    <div class="col"><q-btn @click="markBikeStation">mark BikeStation</q-btn></div>
    <div class="col"><q-btn @click="markIt">mark it</q-btn></div>
    <div class="col"><q-btn @click="updateCenter">updateCenter</q-btn></div>
    <div class="col">Center: {{center}}</div>
  </div>
  <GMap></GMap>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import GMap from '@/components/_week2Utils/gMap.vue'
import store from '@/components/_week2Utils/store/gMap'

const BIKE_STATION_FIXTURE =[
  {
    stationUID: "TXG3001",
    serviceStatus: 1,
    serviceType: 1,
    availableRentBikes: 35,
    availableReturnBikes: 33,
    stationName: "iBike1.0_逢甲大學",
    stationPosition: {

      positionLon: 121.567904444,
      positionLat: 25.0408578889,
    },
    stationAddress:  "台中市福星路/逢甲路口(潮洋機車停車場)",
  },
  {
    stationUID: "TXG3001",
    serviceStatus: 1,
    serviceType: 1,
    availableRentBikes: 35,
    availableReturnBikes: 33,
    stationName: "iBike1.0_逢甲大學",
    stationPosition: {

      positionLon: 121.55742,
      positionLat: 25.041254,
    },
    stationAddress:  "台中市福星路/逢甲路口(潮洋機車停車場)",
  },
  {
    stationUID: "TXG3001",
    serviceStatus: 1,
    serviceType: 1,
    availableRentBikes: 35,
    availableReturnBikes: 33,
    stationName: "iBike1.0_逢甲大學",
    stationPosition: {

      positionLon: 121.565169444,
      positionLat: 25.0377972222,
    },
    stationAddress:  "台中市福星路/逢甲路口(潮洋機車停車場)",
  },
]
export default {
  name: 'GoogleMap',

  components: {
    GMap,
  },

  setup() {
    const center = ref(undefined)
    onMounted(() => {
      center.value = store.getters.map.getCenter()
    })
    return {
      center,
      updateCenter: () => { center.value = store.getters.map.getCenter() },
      toMyLocation: () => store.dispatch('centerByMyLocation'),
      markIt: () => {
        store.dispatch('mark',
          { lat: 25.03357704438537, lng: 121.56165724984085 })
        store.dispatch('mark',
          { lat: 25.1, lng: 121.56165724984085 })
      },
      markBikeStation: ()=> {
      },
    }
  },
}

</script>
