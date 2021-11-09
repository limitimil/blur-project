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
import TourismService from '@/services/tourism'

export default {
  name: 'HelloWorld',
  computed: {
    storyId() {
      return this.$route.params.storyId
    },
  },
  setup() {
    const service = new TourismService()
    const data = ref([])
    const dataCount = ref(0)
    onBeforeMount(async () => {
      const res = await service.top(5)
      dataCount.value = res.length
      data.value = res
    })
    return {
      data,
      dataCount,
    }
  },
}
</script>
