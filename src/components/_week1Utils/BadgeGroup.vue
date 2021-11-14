<template>
  <div class="badge" v-for="badge in badges" :key="badge">#{{badge}}</div>
</template>
<script lang="ts">
/* eslint-disable no-unused-expressions */
import { ref, computed } from 'vue'

export default {
  name: 'LayoutDefault',

  props: ['value'],

  components: {
  },

  setup(props: any) {
    const badges = computed(() => {
      const result = []
      props.value.Class1 && result.push(props.value.Class1)
      props.value.Class2 && result.push(props.value.Class2)
      props.value.Class3 && result.push(props.value.Class3)
      return result
    })
    return {
      leftDrawerOpen: ref(false),
      badges,
    }
  },
}

</script>
<style scoped lang="less">
.badge {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;

  /* Red */

  color: #E15C6C;

  padding-right: 0.5em;
}
</style>
