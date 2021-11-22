<template>
  <q-page>
    <div id="bus">
      <div class="row">
        <div class="col-12">
          <div class="logo column items-center">
            <img src="@/assets/logo/bus-en.svg" width="372"/>
            <img src="@/assets/logo/bus-zh.svg" width="253"/>
          </div>
          <div class="flex justify-center q-gutter-md">
            <q-select v-model="city" :options="['台北市']" label="所在城市" style="width:210px"/>
            <q-select v-model="township" :options="['中山區']" label="所在區域" style="width:210px"/>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent, defineAsyncComponent, ref, watchEffect,
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Bike',
  components: {
  },
  setup() {
    const city = ref('')
    const township = ref('')
    const router = useRouter()
    watchEffect(() => {
      if (city.value !== '' && township.value !== '') {
        router.push({ name: 'BikeStation' })
      }
      return { city, township }
    })

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
