<template>
  <q-page>
    <div id="bike">
      <div class="row">
        <div class="col-12">
          <div class="logo flex justify-center">
            <img src="@/assets/logo/bike.svg" width="480"/>
          </div>
          <BikeCard />
          <div class="flex justify-evenly">
            <img src="@/assets/icon/station.svg" width="150"/>
            <img src="@/assets/icon/road.svg" width="150"/>
            <img src="@/assets/icon/view.svg" width="150"/>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent, defineAsyncComponent, ref, computed,
} from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Bike',
  components: {
    BikeCard: defineAsyncComponent(() => import('@/components/week2/BikeCard.vue')),
  },
  props: {
  },
})
</script>
<style lang="less">
.logo {
  margin-top: 120px;
}
</style>
