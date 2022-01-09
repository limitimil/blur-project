import lodash from 'lodash'
import gMapStore from '@/components/_week2Utils/store/gMap'

export default class GoogleMapService {
  public markV2(position: {lat: number, lng: number}, img: any) {
    gMapStore.dispatch('markV2', { position, img })
  }

  public centerByKeyword(keyword: string) {
    const { map } = gMapStore.getters
    // @ts-ignore
    const geocoder = new google.maps.Geocoder()

    // @ts-ignore
    geocoder.geocode({ address: keyword }, (results, status) => {
      if (status === 'OK') {
          // eslint-disable-next-line no-unused-expressions
          map?.setCenter(results[0].geometry.location)
      } else {
        throw Error(`Geocode was not successful for the following reason: ${status}`)
      }
    })
  }

  public centerByMarks() {
    const { map, markers } = gMapStore.getters
    const latLngList = lodash.map(markers, (marker) => marker.getPosition())
    console.log(latLngList.length)
    // @ts-ignore
    const latlngbounds = new google.maps.LatLngBounds()

    latLngList.forEach((latLng) => {
      latlngbounds.extend(latLng)
    })

    map.setCenter(latlngbounds.getCenter())
    map.fitBounds(latlngbounds)
  }

  public purgeMarkers() {
    gMapStore.commit('purgeMarkers')
  }

  // TODO: refactor this entry point to decouple googlemap service and tdx format
  public getLocation(mode?: string | undefined) { // Expect mode to be "TDXPosition" or undefined
    const { location } = gMapStore.getters
    if (mode === 'TDXPosition') {
      return {
        PositionLon: location.lng,
        PositionLat: location.lat,
      }
    }
    return location
  }
}
