<template>
  <div class="row">
    <q-checkbox
      @update:model-value="updateQueryMethods.keyword"
      v-model="keyword"
      true-value="美食"
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
    onMounted(() => {
      center.value = store.getters.map.getCenter()
    })
    return {
      center,
      calculateCenter: () => { center.value = store.getters.map.getCenter() },
      toMyLocation: () => store.dispatch('centerByMyLocation'),
    }
  },
}
</script>
