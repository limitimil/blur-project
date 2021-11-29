<template>
  <q-page class="flex flex-center">
      <div>
          <h4>{{ storyId }}</h4>
          <br>
          <div>{{ dataCount }}</div>
          <div v-for="item in data" :key="item.ID">
            <StopCard :value="item">
            </StopCard>
          </div>
      </div>
  </q-page>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Stories from './stories'
import StopCard from '@/components/_storyUtils/StopCard.vue'

export default {
  name: 'DataStories',
  components: {
    StopCard,
  },
  setup() {
    const store = useStore()

    const data = ref([])
    const dataCount = ref(0)
    const route = useRoute()
    const storyId = ref(route.params.storyId)
    onBeforeMount(async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const storyFunction = Stories[route.params.storyId]
      const res = await storyFunction()
      dataCount.value = res.length
      data.value = res
    })
    store.dispatch('getSavedIds')
    return {
      data,
      dataCount,
      storyId,
    }
  },
}
</script>
