<template>
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
    v-model="className"
    true-value="自然風景類"
    :false-value="null"
    >ClassName: {{ className }}</q-checkbox
  >
  <q-btn @click="top">Search</q-btn>
  <br />
  <div v-for="item in data" :key="item.ID">
    <Card :value="item" />
  </div>
</template>
<script lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import Card from '@/components/_storyUtils/Card.vue'

export default {
  name: 'Travel',

  components: {
    Card,
  },

  setup() {
    const store = useStore()

    const data = computed(() => store.getters.content)
    const keyword = ref(null)
    const city = ref(null)
    const className = ref(null)

    const top = () => store.dispatch('top')
    const updateQueryMethods = {
      city: (value: string) => store.commit('appendQuery', { city: value }),
      className: (value: string) => store.commit('appendQuery', { className: value }),
      keyword: (value: string) => store.commit('appendQuery', { keyword: value }),
    }
    return {
      data,
      keyword,
      city,
      className,
      top,
      updateQueryMethods,
    }
  },
}

</script>
