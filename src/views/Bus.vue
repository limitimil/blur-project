<template>
  <q-page>
    <q-header v-if="showAdvancedSearch" elevated class="text-white">
      <q-toolbar class="flex justify-between items-center toolbar" style="height:inherit">
        <img src="@/assets/logo/bus-sm.svg" width="123" />
        <q-btn-group flat rounded>
          <q-btn flat class="btn btn-search" rounded label="路線搜尋" />
          <q-btn flat class="btn btn-search" rounded label="站名搜尋" />
        </q-btn-group>
        <q-btn flat class="btn" label="最新消息" />
        <q-btn flat class="btn" label="友站連結" />
        <q-btn flat class="btn" label="意見回饋" />
        <q-btn flat class="btn" label="我的收藏" />
      </q-toolbar>
    </q-header>

    <div id="bus">
      <div v-if="!showAdvancedSearch" class="row">
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
      <div v-else-if="busRoute.RouteID === undefined" class="row q-col-gutter-xl">
        <div class="col-4">
          <q-select v-model="city" :options="cityOptions" label="選擇縣市" style="width:300px"/>
        </div>
        <div class="col-8">
          <q-input placeholder="請輸入路線編號，或直接點選左側路線編號。">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-3">
          <BusRouteCard :value="busRoutes" @update="updateRoute" />
        </div>
        <div class="col-9">
          <GMap class="g-map-bus"></GMap>
        </div>
      </div>
      <div v-else class="row q-col-gutter-xl">
        <div class="col-4 column q-gutter-lg">
          <div class="row">
            <div class="col-2">
              <q-btn round flat @click="delete busRoute.RouteID">
                <img src="@/assets/icon/btnReturn.svg" width="56"/>
              </q-btn>
            </div>
            <div class="col-10">
              <q-select v-model="city" :options="cityOptions" label="選擇縣市" />
            </div>
          </div>
          <div>
            <SingleBusRouteCard :value="busRoute"/>
          </div>
          <div>
            <BusStopsCard :value="busStops"/>
          </div>
        </div>
        <div class="col-8">
          <GMap class="g-map-bus"></GMap>
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
  defineComponent, defineAsyncComponent, ref, computed, reactive, watch,
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import busRouteStore from '@/store/busRoute'
import busStore from '@/store/bus'
import CityService from '@/services/city'

import GMap from '@/components/_week2Utils/gMap.vue'
import GoogleMapService from '@/services/gMap'

export default defineComponent({
  name: 'Bus',
  components: {
    BusRouteCard: defineAsyncComponent(() => import('@/components/_week3Utils/BusRouteCard.vue')),
    SingleBusRouteCard: defineAsyncComponent(() => import('@/components/_week3Utils/SingleBusRouteCard.vue')),
    GMap,
    BusStopsCard: defineAsyncComponent(() => import('@/components/_week3Utils/BusStopsCard.vue')),
  },
  setup() {
    const city = ref(undefined)
    const busRoutes = computed(() => busRouteStore.getters.content)
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
    const showAdvancedSearch = ref(false)
    const search = () => {
      if (!city.value) {
        invalid.value = true
      } else {
        invalid.value = false
        showAdvancedSearch.value = true
      }
    }

    const busRoute = reactive({})
    const updateRoute = (route: any) => {
      Object.assign(busRoute, route)
      busStore.commit('appendQuery', { routeName: route.RouteName.Zh_tw })
      busStore.dispatch('fetch')
    }

    return {
      cityOptions: new CityService().getDecoratedCitiesForQuasarSelect(),
      city,
      busRoutes,
      busStops: computed(() => busStore.getters.content),
      search,
      invalid,
      showAdvancedSearch,
      busRoute,
      updateRoute,
    }
  },
})
</script>
<style lang="less">
html {
  background: #E5E8E7;
}
#bus {
  padding: 55px 140px 0 140px;
}
.q-header {
  height: 90px;
  background: #747474;
  font-size: 24px;
}
.toolbar {
  height: inherit;
  padding: 0 140px;
}
.q-footer {
  height: 90px;
  background: #747474;
  font-size: 18px;
}
.text-warn {
  font-size: 24px;
  color: #D0104C;
}
.btn-search {
  background: #484848;
}
.btn {
  color: #E5E8E7;
  font-size: 24px;
}
// TODO: refine css definition inside GMap.vue
.g-map-bus {
  width: 100% !important;
}
</style>
