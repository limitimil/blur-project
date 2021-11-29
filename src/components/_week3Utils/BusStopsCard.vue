<template>
  <q-card>
    <q-card-section>
      <div class="row text-stop">
        <div class="col-6 flex justify-center" :class="destStyle">
          往 {{value.DestinationStopNameZh}}
        </div>
        <div class="col-6 flex justify-center" :class="departStyle">
          往 {{value.DepartureStopNameZh}}
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-sm">
        <div class="col-3 text-title">站序</div>
        <div class="col-6 text-title">站名</div>
        <div class="col-3 text-title">預估到站</div>
        <template v-for="(stop, index) in value.Stops" :key="index">
          <div class="col-3 text-content">{{stop.StopSequence}}</div>
          <div class="col-6 text-content">{{stop.StopNameZh}}</div>
          <div v-if="stop.EstimateTime > 60" class="col-3 text-content">{{stop.EstimateTime}}</div>
          <div v-else-if="stop.StopStatus === 0" class="col-3 text-content">即將進站</div>
          <div v-else-if="stop.StopStatus === 1" class="col-3 text-content">尚未發車</div>
          <div v-else-if="stop.StopStatus === 2" class="col-3 text-content">交管不停靠</div>
          <div v-else-if="stop.StopStatus === 3" class="col-3 text-content">末班車已過</div>
          <div v-else-if="stop.StopStatus === 4" class="col-3 text-content">今日未營運</div>
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { computed, ref } from 'vue'

export default {
  name: 'BusStopsCard',
  props: [
    'value',
  ],
  setup() {
    const isDepart2Dest = ref(true)
    const destStyle = computed(() => (isDepart2Dest.value ? 'block-dest' : 'block-non-dest'))
    const departStyle = computed(() => (isDepart2Dest.value ? 'block-non-dest' : 'block-dest'))

    return {
      destStyle,
      departStyle,
    }
  },
}

</script>
<style lang="less" scoped>
.text-stop {
  font-weight: 900;
  font-size: 18px;
  line-height: 25px;
}
.block-dest {
  background: #FFFFFF;
  color: #33A6B8;
}
.block-non-dest {
  background: #989898;
  color: #E5E8E7;
}
.text-title {
  font-weight: bold;
  font-size: 14px;
}
.text-content {
  font-size: 12px;
  line-height: 16px;
}
</style>
