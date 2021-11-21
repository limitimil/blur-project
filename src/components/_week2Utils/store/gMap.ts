import { createStore } from 'vuex'

export default createStore({
  state: {
    map: undefined,
    markers: [] as any[],
  },
  getters: {
    map: (state) => state.map,
  },
  mutations: {
    setMap(state, map) {
      state.map = map
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
    mark(context, position) {
      const { map } = context.state
      console.log(position)
      // @ts-ignore
      const marker = new google.maps.Marker({
        position,
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
