<template>
  <q-card>
    <q-card-section class="flex justify-center">
      <div class="text-title">
        <div class="flex justify-center">{{route.RouteName}}</div>
        <div class="flex justify-center">{{route.DepartureStopNameZh}}－{{route.DestinationStopNameZh}}</div>
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
.text-title {
  color: #484848;
  font-weight: 900;
  font-size: 18px;
}
</style>
