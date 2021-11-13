<template>
  <q-page class="flex flex-center">
      <div>
          <h4>{{ storyId }}</h4>
          <br>
          <div>{{ dataCount }}</div>
          <div>{{ data }}</div>
      </div>
  </q-page>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import Stories from './stories'

export default {
  name: 'HelloWorld',
  setup() {
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
    return {
      data,
      dataCount,
      storyId,
    }
  },
}
</script>
