<template>
  <div class="row">
    <q-input v-model="city"></q-input>
    <q-input v-model="routeName"></q-input>
    <q-input v-model="direction"></q-input>
  </div>
  <div class="row">
    <div class="col">Center: {{position}}</div>
  </div>
  <div class="row">
    <q-btn @click="getBusStopOnMap">Get Bus Stop on Map</q-btn>
  </div>
  <GMap></GMap>
</template>
<script lang="ts">
import { ref, onMounted, computed } from 'vue'
import GMap from '@/components/_week2Utils/gMap.vue'
import gMapStore from '@/components/_week2Utils/store/gMap'
import getBusStopOnMap from './getBusStopOnMap'

export default {
  name: 'BikeStation',
  components: {
    GMap,
  },
  setup() {
    const position = ref(undefined)
    const city = ref('Taipei')
    const routeName = ref('204')
    const direction = ref(0)
    const calculateCenter = () => { position.value = gMapStore.getters.map.getCenter() }

    onMounted(() => {
      position.value = gMapStore.getters.map.getCenter()
    })
    return {

      // Varaibles
      city,
      routeName,
      direction,
      position,

      // methods
      calculateCenter,
      getBusStopOnMap: () => {
        getBusStopOnMap(city.value, routeName.value, direction.value, gMapStore)
      },

    }
  },
}
</script>
