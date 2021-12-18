<template>
  <q-page>
    <div id="bus">
      <div class="row">
        <div class="col-12">
          <div class="column justify-evenly items-center" style="height:990px">
            <img src="@/assets/logo/bus-en.svg" width="372"/>
            <img src="@/assets/logo/bus-zh.svg" width="253"/>
            <q-select v-model="city" :options="cityOptions" label="選擇縣市" style="width:446px"/>
            <span v-show="invalid" class="text-warn">請先選擇您要查詢的縣市。</span>
            <q-btn color="amber" label="START" size="30px" @click="search"/>
          </div>
        </div>
      </div>
    </div>
    <q-footer class="text-white">
      <div class="flex flex-center" style="height:inherit">
        © BLUR 2021 │ 六角學院 │ TDX運輸資料流通服務
      </div>
    </q-footer>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch,
} from 'vue'
import { useRouter } from 'vue-router'

import busRouteStore from '@/store/busRoute'
import busStore from '@/store/bus'
import CityService from '@/services/city'

import GoogleMapService from '@/services/gMap'

export default defineComponent({
  name: 'Bus',
  setup() {
    const router = useRouter()
    const city = ref(undefined)
    const googleMapService = new GoogleMapService()
    watch(city, async () => {
      if (city.value) {
        // @ts-ignore
        busRouteStore.commit('appendQuery', { city: city.value.key })
        // @ts-ignore
        busStore.commit('appendQuery', { city: city.value.key })
        await busRouteStore.dispatch('getAll')
        // @ts-ignore
        googleMapService.centerByKeyword(city.value.key)
      }
    })

    const invalid = ref(false)
    const search = () => {
      if (!city.value) {
        invalid.value = true
      } else {
        invalid.value = false
        router.push({ name: 'BusSearch' })
      }
    }

    return {
      cityOptions: new CityService().getDecoratedCitiesForQuasarSelect(),
      city,
      search,
      invalid,
    }
  },
})
</script>
