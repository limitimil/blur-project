<template>
  <q-card class="route">
    <q-card-section class="flex justify-center">
      <div class="text-title">全部路線</div>
    </q-card-section>

    <q-separator />

    <q-card-section class="row">
      <template v-for="route of routes" :key="route">
        <div class="col-3 flex justify-center">
          <a href="#" class="text-route">{{route.RouteName.Zh_tw}}</a>
        </div>
      </template>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { reactive } from 'vue'

export default {
  name: 'BusRoute',
  props: [
    'value',
  ],
  setup(props: any) {
    const routes = reactive(props.value)
    return {
      routes,
    }
  },
}

</script>
<style lang="less" scoped>
.text-title {
  color:#484848;
  font-weight:900;
  font-size:24px;
}
.text-route {
  color:#484848;
  font-size:18px;
}
</style>
