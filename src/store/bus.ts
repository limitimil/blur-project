/* eslint-disable no-unused-expressions */
import { createStore } from 'vuex'
import DynamicBusStopService from '@/services/dynamicBusStop'

interface BusQuery {
  city?: string;
  routeName?: string;
  direction?: number;
}
export default createStore({
  state: {
    commandService: new DynamicBusStopService(),
    content: {},
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
    },
  },
  modules: {
  },
})
