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
  <StopCard :value="route"></StopCard>
</template>
<script lang="ts">
import { ref, onMounted, computed } from 'vue'
import GMap from '@/components/_week2Utils/gMap.vue'

import busStore from '@/store/bus'
import StopCard from '@/components/_storyUtils/StopCard.vue'

export default {
  name: 'BikeStation',
  components: {
    GMap,
    StopCard,
  },
  setup() {
    const position = ref(undefined)
    const city = ref('Taipei')
    const routeName = ref('204')
    const direction = ref(0)
    const calculateCenter = () => { position.value = busStore.getters.map.getCenter() }

    onMounted(() => {
      // TODO: This is a workaround. To solve this issue, you should re-order the GoogleMap handling someday.
      busStore.dispatch('initMap', 'map')
      position.value = busStore.getters.map.getCenter()
    })
    return {

      // computed
      route: computed(() => busStore.getters.content),

      // Varaibles
      city,
      routeName,
      direction,
      position,

      // methods
      calculateCenter,
      getBusStopOnMap: () => {
        busStore.commit('setQuery', {
          city: city.value,
          routeName: routeName.value,
          direction: parseInt(direction.value.toString(), 10),
        })
        busStore.dispatch('fetch')
      },

    }
  },
}
</script>
