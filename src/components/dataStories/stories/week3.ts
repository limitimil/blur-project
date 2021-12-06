import BusStopService from '@/services/busStop'
import BusRouteService from '@/services/busRoute'
import DynamicBusStopService from '@/services/dynamicBusStop'
import { BusDataType, getBusData, getBusDataStreaming } from '@/data-fetch/bus'

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BUS_DATA_TYPE = [
  'RealTimeByFrequency',
  'RealTimeNearStop',
  'EstimatedTimeOfArrival',
  'DisplayStopOfRoute',
]
const getBusDataInRealTimeByFrequencyStreaming = async () => getBusDataStreaming('HsinChu', BusDataType.RealTimeByFrequency, '81')
const getBusDataInRealTimeNearStopStreaming = async () => getBusDataStreaming('HsinChu', BusDataType.RealTimeNearStop, '81')
const getBusDataInEstimatedTimeOfArrivalStreaming = async () => getBusDataStreaming('HsinChu', BusDataType.EstimatedTimeOfArrival, '81')
const getBusDataInRealTimeByFrequency = async () => getBusData('HsinChu', BusDataType.RealTimeByFrequency, '81')
const getBusDataInRealTimeNearStop = async () => getBusData('HsinChu', BusDataType.RealTimeNearStop, '81')
const getBusDataInEstimatedTimeOfArrival = async () => getBusData('HsinChu', BusDataType.EstimatedTimeOfArrival, '81')
const getBusDataInDisplayStopOfRoute = async () => getBusData('Taipei', BusDataType.DisplayStopOfRoute, '204')

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
