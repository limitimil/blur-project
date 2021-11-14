/* eslint-disable no-unused-expressions */
import { createStore } from 'vuex'
import TourismService from '@/services/tourism'
import LocalCollection from '@/data-fetch/localCollection'

const MAX_CONTENT_COUNT = 9
interface TravelQuery {
  city?: string;
  keyword?: string;
  className?: string;
}
export default createStore({
  state: {
    commandService: new TourismService(),
    commandLocal: new LocalCollection(),
    totalCount: 0,
    content: [],
    savedIds: [],
  },
  getters: {
    savedIds: (state) => state.savedIds,
    content: (state) => state.content,
    totalCount: (state) => state.totalCount,
    query: (state):TravelQuery => state.commandService.getStatus(),
  },
  mutations: {
    appendQuery(state, q: TravelQuery) {
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
    setSaveIds(state, ids) {
      state.savedIds = ids
    },
  },
  actions: {
    async top(context) {
      const command = context.state.commandService
      command.top(MAX_CONTENT_COUNT)
      context.commit('setContent', await command.fetch())
    },
    async toPage(context, page:number) {
      const command = context.state.commandService
      command.toPage(page)
      context.commit('setContent', await command.fetch())
    },
    save(context, id: string) {
      const command = context.state.commandLocal
      command.appendCollectedSceneSpotId(id)
      context.commit('setSaveIds', command.getCollectedSceneSpotIds())
    },
    unSave(context, id: string) {
      const command = context.state.commandLocal
      command.removeCollectedSceneSpotId(id)
      context.commit('setSaveIds', command.getCollectedSceneSpotIds())
    },
    getSavedIds(context) {
      const command = context.state.commandLocal
      console.log('get')
      context.commit('setSaveIds', command.getCollectedSceneSpotIds())
    },
  },
  modules: {
  },
})
