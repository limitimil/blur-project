import BusStopService from '@/services/busStop'
import BusRouteService from '@/services/busRoute'
import DynamicBusStopService from '@/services/dynamicBusStop'
import BusDataFetchBuilder, { BusDataType } from '@/data-fetch/bus'

const topFiveBusRouteInTaipei = async () => {
  const service = new BusRouteService()
  service.top(5)
  service.setCity('Taipei')
  return service.fetch()
}

const topFiveBusRouteInHsinChu = async () => {
  const service = new BusRouteService()
  service.top(5)
  service.setCity('HsinChu')
  return service.fetch()
}

const topFiveBusRouteInTaipeiWithKeyword = async () => {
  const service = new BusRouteService()
  service.top(5)
  service.setCity('Taipei')
  service.setKeyword('204')
  return service.fetch()
}

const getBusRouteByRouteId = async () => {
  const service = new BusRouteService()
  service.setCity('Taipei')
  return [await service.getByUniqId('11212')] // This method will return only one result.
}

const getBusDataInRealTimeByFrequencyStreaming = async () => {
  let builder = new BusDataFetchBuilder()
  builder = builder.withRouteName('81')
  builder = builder.useStreaming()
  builder = builder.withCity('HsinChu')
  builder = builder.withType(BusDataType.RealTimeByFrequency)
  return builder.invoke()
}
const getBusDataInRealTimeNearStopStreaming = async () => {
  let builder = new BusDataFetchBuilder()
  builder = builder.withRouteName('81')
  builder = builder.useStreaming()
  builder = builder.withCity('HsinChu')
  builder = builder.withType(BusDataType.RealTimeNearStop)
  return builder.invoke()
}
const getBusDataInEstimatedTimeOfArrivalStreaming = async () => {
  let builder = new BusDataFetchBuilder()
  builder = builder.withRouteName('81')
  builder = builder.useStreaming()
  builder = builder.withCity('HsinChu')
  builder = builder.withType(BusDataType.EstimatedTimeOfArrival)
  return builder.invoke()
}
const getBusDataInRealTimeByFrequency = async () => {
  let builder = new BusDataFetchBuilder()
  builder = builder.withRouteName('81')
  builder = builder.withCity('HsinChu')
  builder = builder.withType(BusDataType.RealTimeByFrequency)
  return builder.invoke()
}
const getBusDataInRealTimeNearStop = async () => {
  let builder = new BusDataFetchBuilder()
  builder = builder.withRouteName('81')
  builder = builder.withCity('HsinChu')
  builder = builder.withType(BusDataType.RealTimeNearStop)
  return builder.invoke()
}
const getBusDataInEstimatedTimeOfArrival = async () => {
  let builder = new BusDataFetchBuilder()
  builder = builder.withRouteName('81')
  builder = builder.withCity('HsinChu')
  builder = builder.withType(BusDataType.EstimatedTimeOfArrival)
  return builder.invoke()
}
const getBusDataInDisplayStopOfRoute = async () => {
  let builder = new BusDataFetchBuilder()
  builder = builder.withRouteName('204')
  builder = builder.withCity('Taipei')
  builder = builder.withType(BusDataType.DisplayStopOfRoute)
  return builder.invoke()
}

const getDynamicBusStop = async () => {
  const service = new DynamicBusStopService()
  service.setCity('HsinChu')
  service.setRouteName('81')
  service.setDirection(0)
  return [await service.fetch()]
}

const busStopNearBy101 = async () => {
  const service = new BusStopService()
  service.setCity('Taipei')
  service.setNearBy({
    PositionLon: 121.56165724984085,
    PositionLat: 25.03357704438537,
  })
  return service.fetch()
}

const topFiveBusStopInTaipei = async () => {
  const service = new BusStopService()
  service.setCity('Taipei')
  service.top(5)
  return service.fetch()
}

export default {
  topFiveBusRouteInTaipei,
  topFiveBusRouteInHsinChu,
  topFiveBusRouteInTaipeiWithKeyword,
  getBusRouteByRouteId,
  getBusDataInRealTimeByFrequencyStreaming,
  getBusDataInRealTimeNearStopStreaming,
  getBusDataInEstimatedTimeOfArrivalStreaming,
  getBusDataInRealTimeByFrequency,
  getBusDataInRealTimeNearStop,
  getBusDataInEstimatedTimeOfArrival,
  getBusDataInDisplayStopOfRoute,
  getDynamicBusStop,
  busStopNearBy101,
  topFiveBusStopInTaipei,
}
