<template>
  <div class="row">
    <div class="col"><q-btn @click="toMyLocation">my location</q-btn></div>
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
    }
  },
}

</script>
