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

import TaiwanMap from '@/components/taiwanMap/index.vue'
import TaiwanCountyMap from './stories/TaiwanCountyMap.vue'

export default {
  name: 'ComponentStory',
  components: {
    TaiwanMap,
    TaiwanCountyMap,
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
