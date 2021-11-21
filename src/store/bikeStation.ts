/* eslint-disable no-unused-expressions */
import { createStore } from 'vuex'
import BikeStationService from '@/services/bikeStation'
import TdxPosition from '@/interface/TdxPosition'

const MAX_CONTENT_COUNT = 9
interface BikeStationQuery {
  city?: string;
  keyword?: string;
  position?: number[]; // lat, lnt
}
export default createStore({
  state: {
    commandService: new BikeStationService(),
    totalCount: 0,
    content: [],
    savedIds: [],
  },
  getters: {
    savedIds: (state) => state.savedIds,
    content: (state) => state.content,
    totalCount: (state) => state.totalCount,
    query: (state):BikeStationQuery => state.commandService.getStatus(),
  },
  mutations: {
    appendQuery(state, q: BikeStationQuery) {
      q.city && state.commandService.setCity(q.city)
      q.keyword && state.commandService.setKeyword(q.keyword)
      q.position && state.commandService.setNearBy({
        PositionLat: q.position[0],
        PositionLon: q.position[1],
      })
    },
    setQuery(state, q: BikeStationQuery) {
      state.commandService.setCity(q.city)
      state.commandService.setKeyword(q.keyword)

      // @ts-ignore
      const tdxPosition: undefined | TdxPosition = q?.position?.length > 2 ? undefined : {
        // @ts-ignore
        PositionLat: q.position[0],
        // @ts-ignore
        PositionLon: q.position[1],
      }
      state.commandService.setNearBy(tdxPosition)
    },
  },
  actions: {
    async top(context) {
      const command = context.state.commandService
      command.top(MAX_CONTENT_COUNT)
      context.commit('setContent', await command.fetch())
    },
  },
  modules: {
  },
})
