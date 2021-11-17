import { createStore } from 'vuex'

export default createStore({
  state: {
    map: undefined,
  },
  mutations: {
    setMap(state, map) {
      state.map = map
    },
  },
  actions: {
    initMap(context, elementId) {
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
    centerByMyLocation(context) {
      const { map } = context.state
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }

            map.setCenter(pos)
          },
          (err) => {
            // @ts-ignore
            console.err(err)
            // @ts-ignore
            console.err('get current position fail')
          },
        )
      } else {
        // @ts-ignore
        console.err('browser don\'t support location')
      }
    },
  },
  modules: {
  },
})
