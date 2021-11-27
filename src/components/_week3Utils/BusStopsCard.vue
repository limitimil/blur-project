<template>
  <q-card>
    <q-card-section>
      <div class="row text-stop">
        <div class="col-6 flex justify-center">
          往 {{data.DestinationStopNameZh}}
        </div>
        <div class="col-6 flex justify-center">
          往 {{data.DepartureStopNameZh}}
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-3 text-title">站序</div>
        <div class="col-6 text-title">站名</div>
        <div class="col-3 text-title">預估到站</div>
        <template v-for="(stop, index) in data.Stops" :key="index">
          <div class="col-3 text-content">{{stop.StopSequence}}</div>
          <div class="col-6 text-content">{{stop.StopNameZh}}</div>
          <div v-if="stop.EstimateTime > 60" class="col-3 text-content">{{stop.EstimateArrivalTimeStamp}}</div>
          <div v-else class="col-3 text-content">{{stop.StopStatus}}</div>
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { computed } from 'vue'

export default {
  name: 'BusStopsCard',
  props: [
    'value',
  ],
  setup() {
    const data = {
      RouteID: 10132,
      RouteName: 234,
      DepartureStopNameZh: '板橋',
      DestinationStopNameZh: '西門',
      Direction: 0,
      Stops: [
        {
          StopID: '18266',
          StopNameZh: '華中河濱公園',
          StopBoarding: -1,
          StopSequence: 1,

          EstimateTime: 300,
          EstimateArrivalTimeStamp: 1,
          StopStatus: 0,
        },
      ],
    }

    return {
      data,
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
.text-title {
  font-weight: bold;
  font-size: 14px;
}
.text-content {
  font-size: 12px;
  line-height: 16px;
}
</style>
