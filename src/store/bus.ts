/* eslint-disable no-unused-expressions */
import { createStore } from 'vuex'
import DynamicBusStopService, { DynamicBusStops, BusStop } from '@/services/dynamicBusStop'

import gMap from './modules/gMap'
import TdxPosition from '@/interface/TdxPosition'

import IconService from '@/services/icon'

interface BusQuery {
  city?: string;
  routeName?: string;
  direction?: number;
}
export default createStore({
  state: {
    commandService: new DynamicBusStopService(),
    content: {} as DynamicBusStops,
  },
  getters: {
    content: (state) => state.content,
    query: (state):BusQuery => state.commandService.getStatus(),
  },
  mutations: {
    appendQuery(state, q: BusQuery) {
      q.city && state.commandService.setCity(q.city)
      q.routeName && state.commandService.setRouteName(q.routeName)
      q.direction && state.commandService.setDirection(q.direction)
    },
    setQuery(state, q: BusQuery) {
      state.commandService.setCity(q.city)
      state.commandService.setRouteName(q.routeName)
      // @ts-ignore
      state.commandService.setDirection(q.direction)
    },
    setContent(state, content) {
      state.content = content
    },
  },
  actions: {
    async fetch(context) {
      const command = context.state.commandService
      context.commit('setContent', await command.fetch())
      const { Stops } = context.state.content
      context.dispatch('initMap', 'map')
      Stops.forEach((element: BusStop) => {
        context.dispatch('markBusStop', {
          position: element.StopPosition,
          sequence: element.StopSequence,
          color: 'blue',
        })
      })
    },
    // TODO: poc first, seperate responsibility then
    async markBusStop(context,
                param: { position: TdxPosition,
                  sequence: number,
                  color: string,
                }) {
      const latlng = {
        lat: param.position.PositionLat,
        lng: param.position.PositionLon,
      }
      const img = await new IconService().getLocationIcon(param.sequence, param.color)
      context.dispatch('markV2', { position: latlng, img })
    },
  },
  modules: {
    gMap,
  },
})
