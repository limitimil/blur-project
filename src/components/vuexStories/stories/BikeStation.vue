<template>
  <div class="row">
    <q-checkbox
      @update:model-value="updateQueryMethods.keyword"
      v-model="keyword"
      true-value="四四南村"
      :false-value="null"
      >Keyword: {{ keyword }}</q-checkbox
    >
    <q-checkbox
      @update:model-value="updateQueryMethods.city"
      v-model="city"
      true-value="Taipei"
      :false-value="null"
      >City: {{ city }}</q-checkbox
    >
    <q-checkbox
      @update:model-value="updateQueryMethods.usePosition"
      v-model="usePosition"
      >Position: {{ position }}</q-checkbox
    >
  </div>
  <div class="row">
    <div class="col"><q-btn @click="toMyLocation">My Location</q-btn></div>
    <div class="col"><q-btn @click="calculateCenter">Calculate Center</q-btn></div>
    <div class="col">Center: {{position}}</div>
  </div>
  <div class="row">
    <q-btn @click="top">Search</q-btn>
  </div>
  <GMap></GMap>
  <div v-for="item in data" :key="item.ID">
    <Card :value="item" />
  </div>
</template>
<script lang="ts">
import { ref, onMounted, computed } from 'vue'
import GMap from '@/components/_week2Utils/gMap.vue'
import gMapStore from '@/components/_week2Utils/store/gMap'
import bikeStationStore from '@/store/bikeStation'
import Card from '@/components/_storyUtils/Card.vue'

export default {
  name: 'GoogleMap',
  components: {
    GMap,
    Card,
  },
  setup() {
    const position = ref(undefined)
    const usePosition = ref(false)
    const toMyLocation = () => gMapStore.dispatch('centerByMyLocation')
    const calculateCenter = () => { position.value = gMapStore.getters.map.getCenter() }

    onMounted(() => {
      position.value = gMapStore.getters.map.getCenter()
    })
    return {
      // Store
      bikeStationStore,

      // Varaibles
      usePosition,
      keyword: ref(null),
      city: ref(null),
      position,
      data: computed(() => bikeStationStore.getters.content),

      // methods
      toMyLocation,
      calculateCenter,
      top: () => bikeStationStore.dispatch('top'),

      // method group
      updateQueryMethods: {
        city: (value: string) => bikeStationStore.commit('appendQuery', { city: value }),
        keyword: (value: string) => bikeStationStore.commit('appendQuery', { keyword: value }),
        usePosition: (value: any) => {
          if (value) {
            calculateCenter()
            bikeStationStore.commit('appendQuery', { position: position.value })
          } else {
            const { query } = bikeStationStore.getters
            delete query.nearBy
            bikeStationStore.commit('setQuery', { ...query })
          }
        },
      },
    }
  },
}
</script>
