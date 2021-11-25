<template>
  <q-card>
    <q-card-section class="flex justify-between items-center">
      <div class="text">
        <div class="text-title">{{route.RouteName}}</div>
        <div class="text-content">{{route.DepartureStopNameZh}}－{{route.DestinationStopNameZh}}</div>
      </div>
      <div class="collection">
        star
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { computed } from 'vue'
import BusStore from '@/store/bus'

export default {
  name: 'SingleBusRouteCard',
  props: [
    'value',
  ],
  setup(props: any) {
    const route = computed(() => BusStore.getters.content)

    return {
      route,
    }
  },
}

</script>
<style lang="less" scoped>
.text {
  color: #484848;
}
.text-title {
  font-weight: 900;
  font-size: 18px;
}
.text-content {
  font-size: 14px;
}
</style>
