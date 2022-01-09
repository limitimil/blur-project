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
      <router-view></router-view>
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

import BusStopService from '@/services/busStop'

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
    const showAdvancedSearch = ref(true)
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
      handleMapCenter: async () => {
        const service = new BusStopService()
        const location = googleMapService.getLocation()
        const inferedCity = new CityService().getCityByLatLng(location)

        service.setCity(inferedCity)
        service.setNearBy(location)

        const result = await service.fetch()

        googleMapService.purgeMarkers()
        result.forEach((stop: BusStop) => {
          // TODO: do something after centering the map by location
        })
      },
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
  height: 500px;
}
</style>
