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
}
