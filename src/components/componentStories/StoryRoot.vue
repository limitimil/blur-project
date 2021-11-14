<template>
  <q-page class="flex flex-center">
    <div>
      <h4>{{ storyId }}</h4>
      <br />
      <div>Hello World</div>
      <TaiwanMap/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import TaiwanMap from '@/components/taiwanMap/index.vue'

export default {
  name: 'ComponentStory',
  components: {
    TaiwanMap,
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
