<template>
  <div class="card-container">
    <div class="map" id="map"></div>
  </div>
</template>

<script lang="js">
import { onMounted, defineComponent } from 'vue'
import store from './store/gMap'

export default defineComponent({
  name: 'LayoutDefault',

  components: {
  },

  setup() {
    onMounted(() => {
      store.dispatch('initMap', 'map')
    })
    return {
    }
  },
})

</script>
<style scoped lang="less">
.card-container {
  display: flex;
  height: 500px;
  width: 600px;
}

.map {
  width: 100%;
}

</style>
