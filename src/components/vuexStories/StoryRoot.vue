<template>
  <q-page class="flex flex-center">
    <div>
      <h4>{{ storyId }}</h4>
      <component :is="storyId"></component>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Travel from './stories/Travel.vue'
import BikeStation from './stories/BikeStation.vue'
import BusStopMap from './stories/BusStopMap.vue'

export default {
  name: 'VuexStory',
  components: {
    Travel,
    BikeStation,
    BusStopMap,
  },
  setup() {
    const route = useRoute()

    const storyId = ref(route.params.storyId)
    return {
      storyId,
    }
  },
}
</script>
