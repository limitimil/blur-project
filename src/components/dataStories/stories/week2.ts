import BikeStationService from '@/services/bikeStation'

const topFiveBikeStationInTaipei = async () => {
  const service = new BikeStationService()
  service.top(5)
  service.setCity('Taipei')
  return service.fetch()
}
const topFiveBikeStationNearBy101 = async () => {
  const service = new BikeStationService()
  service.top(5)
  service.setCity('Taipei')
  service.setNearBy({
    PositionLon: 121.56165724984085,
    PositionLat: 25.03357704438537,
  })
  return service.fetch()
}
const topFiveBikeStationNearBy101WithKeyword = async () => {
  const service = new BikeStationService()
  service.top(5)
  service.setCity('Taipei')
  service.setNearBy({
    PositionLon: 121.56165724984085,
    PositionLat: 25.03357704438537,
  })
  service.byKeyword('四四南村')
  return service.fetch()
}
export default {
  topFiveBikeStationInTaipei,
  topFiveBikeStationNearBy101,
  topFiveBikeStationNearBy101WithKeyword,
}
