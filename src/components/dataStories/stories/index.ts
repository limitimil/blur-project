import TourismService from '@/services/tourism'
import BikeStationService from '@/services/bikeStation'

const topFiveRecordWithOffsetTwo = async () => {
  const service = new TourismService()
  service.top(5)
  service.toPage(2)
  return service.fetch()
}
const topFiveRecordWithOffsetTwoInTaipei = async () => {
  const service = new TourismService()
  service.top(5)
  service.toPage(2)
  service.setCity('Taipei')
  return service.fetch()
}
const topFiveRecordWithOffsetTwoWithKeyword = async () => {
  const service = new TourismService()
  service.top(5)
  service.toPage(2)
  service.byKeyword('美食')
  return service.fetch()
}
const topFiveRecordWithOffsetTwoWithClassName = async () => {
  const service = new TourismService()
  service.top(5)
  service.toPage(2)
  service.setClassName('自然風景類')
  return service.fetch()
}
const topFiveRecordWithOffsetTwoWithClassNameAndCity = async () => {
  const service = new TourismService()
  service.top(5)
  service.toPage(2)
  service.setClassName('自然風景類')
  service.setCity('Taipei')
  return service.fetch()
}
const topFiveRecordWithOffsetTwoWithClassNameAndKeyword = async () => {
  const service = new TourismService()
  service.top(5)
  service.toPage(2)
  service.setClassName('自然風景類')
  service.byKeyword('美食')
  return service.fetch()
}
const topFiveRecordWithOffsetTwoWithCityAndKeyword = async () => {
  const service = new TourismService()
  service.top(5)
  service.toPage(2)
  service.setCity('Taipei')
  service.byKeyword('美食')
  return service.fetch()
}
const topFiveRecordInCollection = async () => {
  const service = new TourismService()
  service.top(5)
  service.useCollection(true)
  return service.fetch()
}
const topFiveRecordInCollectionWithKeywordAndClassName = async () => {
  const service = new TourismService()
  service.top(5)
  service.useCollection(true)
  service.setClassName('自然風景類')
  service.byKeyword('美食')
  return service.fetch()
}
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
  topFiveRecordWithOffsetTwo,
  topFiveRecordWithOffsetTwoInTaipei,
  topFiveRecordWithOffsetTwoWithKeyword,
  topFiveRecordWithOffsetTwoWithClassName,
  topFiveRecordWithOffsetTwoWithClassNameAndCity,
  topFiveRecordWithOffsetTwoWithClassNameAndKeyword, // Buggy
  topFiveRecordWithOffsetTwoWithCityAndKeyword,
  topFiveRecordInCollection,
  topFiveRecordInCollectionWithKeywordAndClassName, // Url Too Long
  topFiveBikeStationInTaipei,
  topFiveBikeStationNearBy101,
  topFiveBikeStationNearBy101WithKeyword,
}
