<template>
  <GMap></GMap>
</template>
<script lang="ts">
import { ref } from 'vue'
import GMap from '@/components/_week2Utils/gMap.vue'

export default {
  name: 'GoogleMap',

  components: {
    GMap,
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    }
  },
}

</script>
<style scoped lang="less">
.hack1{
 background-color: hsla(208, 26%, 75%, 1);
}
.hack2{
 background-color: hsla(17, 25%, 33%, 1);
}
.hack3{
 background-color: hsla(203, 16%, 96%, 1);
}
.hack4{
 background-color: hsla(214, 15%, 62%, 1);
}
.hack5{
 background-color: hsla(240, 7%, 47%, 1);
}
</style>
