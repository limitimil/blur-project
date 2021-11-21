<template>
  <q-page class="flex flex-center">
    <div>
      <h4>{{ storyId }}</h4>
      <br />
      <component :is="storyId"></component>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import TaiwanCountyMap from './stories/TaiwanCountyMap.vue'
import GoogleMap from './stories/GoogleMap.vue'

export default {
  name: 'ComponentStory',
  components: {
    TaiwanCountyMap,
    GoogleMap,
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
