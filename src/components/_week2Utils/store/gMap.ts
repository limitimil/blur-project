import { createStore } from 'vuex'
import TdxPosition from '@/interface/TdxPosition'
// @ts-ignore
import gMapMark from '@/assets/icon/gMapMark.svg'

export default createStore({
  state: {
    map: undefined,
    markers: [] as any[],
  },
  getters: {
    map: (state) => state.map,
    markers: (state) => state.markers,
  },
  mutations: {
    setMap(state, map) {
      state.map = map
    },
    purgeMarkers(state) {
      state.markers = []
    },
    appendMarker(state, marker) {
      state.markers = [
        ...state.markers,
        marker,
      ]
    },
  },
  actions: {
    initMap(context, elementId) {
      // @ts-ignore
      const map = new google.maps.Map(document.getElementById(elementId), {
        zoom: 11,
        center: { lat: 25.03357704438537, lng: 121.56165724984085 },
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
      })
      context.commit('setMap', map)
    },
    markTdxPosition(context, position: TdxPosition) {
      const latlng = {
        lat: position.PositionLat,
        lng: position.PositionLon,
      }
      context.dispatch('markV2', { position: latlng, img: gMapMark })
    },
    // TODO: deprecate this
    mark(context, position) {
      const { map } = context.state
      // @ts-ignore
      const marker = new google.maps.Marker({
        position,
        icon: gMapMark,
        map,
      })
      context.commit('appendMarker', marker)
    },
    markV2(context, { position, img }) {
      const { map } = context.state
      // @ts-ignore
      const marker = new google.maps.Marker({
        position,
        icon: img,
        map,
      })
      context.commit('appendMarker', marker)
    },
    centerByMyLocation(context): any {
      const { map } = context.state
      if (map && navigator.geolocation) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }

              // @ts-ignore
              // eslint-disable-next-line no-unused-expressions
              map?.setCenter(pos)
              return resolve(pos)
            },
            (err) => {
              // @ts-ignore
              console.error(err)
              return reject(Error('get current position fail'))
            },
          )
        })
      }
      // @ts-ignore
      return Promise.reject(Error('browser don\'t support location'))
    },
  },
  modules: {
  },
})
