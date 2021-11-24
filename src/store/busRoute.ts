/* eslint-disable no-unused-expressions */
import { createStore } from 'vuex'
import BusRouteService from '@/services/busRoute'
import TdxPosition from '@/interface/TdxPosition'

const MAX_CONTENT_COUNT = 9
interface BusRouteQuery {
  city?: string;
  keyword?: string;
  position?: any; // lat, lng
}
export default createStore({
  state: {
    commandService: new BusRouteService(),
    totalCount: 0,
    content: [],
    savedIds: [],
  },
  getters: {
    savedIds: (state) => state.savedIds,
    content: (state) => state.content,
    totalCount: (state) => state.totalCount,
    query: (state):BusRouteQuery => state.commandService.getStatus(),
  },
  mutations: {
    appendQuery(state, q: BusRouteQuery) {
      q.city && state.commandService.setCity(q.city)
      q.keyword && state.commandService.setKeyword(q.keyword)
      q.position && state.commandService.setNearBy({
        PositionLat: q.position.lat(),
        PositionLon: q.position.lng(),
      })
    },
    setQuery(state, q: BusRouteQuery) {
      state.commandService.setCity(q.city)
      state.commandService.setKeyword(q.keyword)

      // @ts-ignore
      const tdxPosition: undefined | TdxPosition = q?.position && q.position.length > 2 ? {
        // @ts-ignore
        PositionLat: q.position[0],
        // @ts-ignore
        PositionLon: q.position[1],
      } : undefined
      state.commandService.setNearBy(tdxPosition)
    },
    setContent(state, content) {
      state.content = content
    },
  },
  actions: {
    async getAll(context) {
      const command = context.state.commandService
      command.getAll()
      context.commit('setContent', await command.fetch())
    },
  },
  modules: {
  },
})
