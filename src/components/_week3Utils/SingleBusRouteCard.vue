<template>
  <q-card>
    <q-card-section class="flex justify-center">
      <div class="text-title">
        <div class="flex justify-center">{{route.RouteName.Zh_tw}}</div>
        <div class="flex justify-center">{{route.DepartureStopNameZh}}－{{route.DestinationStopNameZh}}</div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { computed } from 'vue'

export default {
  name: 'SingleBusRouteCard',
  props: [
    'value',
  ],
  setup(props: any) {
    const route = computed(() => props.value)

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
