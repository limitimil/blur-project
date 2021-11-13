/* eslint-disable no-unused-expressions */
import { createStore } from 'vuex'
import TourismService from '@/services/tourism'

const MAX_CONTENT_COUNT = 9
interface TravelQuery {
  city?: string;
  keyword?: string;
  className?: string;
}
export default createStore({
  state: {
    commandService: new TourismService(),
    totalCount: 0,
    content: [],
    // other than fields in TourismService, the following information should be saved in this state
    // 1. totalCount
  },
  getters: {
    content: (state) => state.content,
    totalCount: (state) => state.totalCount,
    query: (state):TravelQuery => {
      city: state.commandService.city,
      keyword: state.commandService.keyword,
      className: state.commandService.className,
    },
  },
  mutations: {
    appendQuery(state, q: TravelQuery) {
      console.log(q)
      q.city && state.commandService.setCity(q.city)
      q.className && state.commandService.setClassName(q.className)
      q.keyword && state.commandService.setKeyword(q.keyword)
    },
    setQuery(state, q: TravelQuery) {
      state.commandService.setCity(q.city)
      state.commandService.setClassName(q.className)
      state.commandService.setKeyword(q.keyword)
    },
    setContent(state, content) {
      state.content = content
    },
  },
  actions: {
    async top(context) {
      const command = context.state.commandService
      command.top(MAX_CONTENT_COUNT)
      console.log(context.state.commandService)
      context.commit('setContent', await command.fetch())
    },
    async toPage(context, page:number) {
      const command = context.state.commandService
      command.toPage(page)
      context.commit('setContent', await command.fetch())
    },
  },
  modules: {
  },
})
