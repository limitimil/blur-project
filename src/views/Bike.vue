<template>
  <q-page>
    <div id="bike">
      <div class="row">
        <div class="col-12">
          <div class="logo flex justify-center">
            <img src="@/assets/logo/bike.svg" width="480"/>
          </div>
          <div class="flex justify-center">
            <q-select v-model="city" :options="['台北市']" label="所在城市" />
            <q-select v-model="township" :options="['中山區']" label="所在區域" />
          </div>
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
  },
  setup() {
    const city = ref('')
    const township = ref('')

    return {
      city,
      township,
    }
  },
})
</script>
<style lang="less">
.logo {
  margin-top: 120px;
}
</style>
