<template>
  <q-card class="card">
    <q-card-section class="justify-between" horizontal>
      <q-card-section class="column justify-between q-pa-sm" style="width:inherit">
        <div class="q-gutter-xs">
          <div class="text-youbike">YouBike 1.0</div>
          <div class="text-name">中正公園(中美路)</div>
          <div class="text-location">中美路101-113號對面人行道</div>
        </div>
        <div class="row justify-evenly">
          <div class="column items-center">
            <div class="text-available">可借車輛</div>
            <div class="text-count">12</div>
          </div>
          <div class="row items-center">
            <div class="break-line"></div>
          </div>
          <div class="column items-center">
            <div class="text-available">可還車位</div>
            <div class="text-count">08</div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions vertical class="justify-end">
        <q-btn flat round color="red" icon="favorite" />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'BikeCard',
  components: {
  },
  props: {
  },
})
</script>
<style lang="less">
.card {
  width: 335px;
  height: 160px;
  border-radius: 10px !important;
  > div {
    width: inherit;
    height: inherit;
  }
}
.text-youbike {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #4E4E4E;
}
.text-name {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.02em;
}
.text-location {
  font-size: 13px;
  line-height: 18px;
}
.text-available {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
}
.text-count {
  font-size: 36px;
  line-height: 42px;
}
.break-line {
  width: 28px;
  height: 0px;
  border: 1px solid #D2D2D2;
  transform: rotate(90deg);
}
</style>
