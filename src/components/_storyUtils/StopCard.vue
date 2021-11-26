<template>
  <q-card class="card">
    <q-card-section>
      <div class="row">
        <label for="" class="row">Stops</label>
        <ul>
          <li class="col" v-for="stop in value.Stops" :key="stop"> Stop Fields
            <ul>
              <li> StopID: {{stop.StopID }} </li>
              <li> StopNameZh: {{stop.StopNameZh}} </li>
              <li> StopBoarding: {{stop.StopBoarding}} </li>
              <li> StopSequence: {{stop.StopSequence}} </li>

              <li> EstimateTime(allowed to be empty): {{stop.EstimateTime}} </li>
              <li> EstimateArrivalTimeStamp(allowed to be empty): {{stop.EstimateArrivalTimeStamp}} </li>
              <li> StopStatus: {{stop.StopStatus}} </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="row">
        <label for="" class="col">RouteID</label>
        <div class="col">{{ value.RouteID }}</div>
      </div>
      <div class="row">
        <label for="" class="col">RouteName</label>
        <div class="col">{{ value.RouteName }}</div>
      </div>
      <div class="row">
        <label for="" class="col">DepartureStopNameZh</label>
        <div class="col">{{ value.DepartureStopNameZh }}</div>
      </div>
      <div class="row">
        <label for="" class="col">DestinationStopNameZh</label>
        <div class="col">{{ value.DestinationStopNameZh }}</div>
      </div>
      <div class="row">
        <label for="" class="col">Direction</label>
        <div class="col">{{ value.Direction }}</div>
      </div>
      <div class="row">
        <label for="" class="col">Stops.length</label>
        <div class="col">{{ value.Stops?.length }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">

export default {
  name: 'StopCard',

  props: [
    'value',
  ],

  components: {
  },

  setup() {
    return {
    }
  },
}

</script>
<styile lang="less" scoped>
.card {
  border-radius: 15px;
}
.card-header {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;

  /* Red */

  color: #E15C6C;
}
</styile>
