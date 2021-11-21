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
      @update:model-value="updateQueryMethods.className"
      v-model="usePosition"
      >Position: {{ position }}</q-checkbox
    >
  </div>
  <div class="row">
    <div class="col"><q-btn @click="toMyLocation">My Location</q-btn></div>
    <div class="col"><q-btn @click="calculateCenter">Calculate Center</q-btn></div>
    <div class="col">Center: {{position}}</div>
  </div>
  <GMap></GMap>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import GMap from '@/components/_week2Utils/gMap.vue'
import store from '@/components/_week2Utils/store/gMap'
export default {
  name: 'GoogleMap',
  components: {
    GMap,
  },
  setup() {
    const center = ref(undefined)
    const usePosition = ref(false)
    onMounted(() => {
      center.value = store.getters.map.getCenter()
    })
    return {
      center,
      usePosition,
      keyword: ref(null),
      city: ref(null),
      position: ref(null),
      calculateCenter: () => { center.value = store.getters.map.getCenter() },
      toMyLocation: () => store.dispatch('centerByMyLocation'),
      updateQueryMethods: {
        city: (value: string) => store.commit('appendQuery', { city: value }),
        className: (value: string) => store.commit('appendQuery', { className: value }),
        keyword: (value: string) => store.commit('appendQuery', { keyword: value }),
      },
    }
  },
}
</script>
