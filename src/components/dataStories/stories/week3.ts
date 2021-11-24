import BusRouteService from '@/services/busRoute'
import BusScheduleService from '@/services/busSchedule'
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
const getBusDataInRealTimeByFrequencyStreaming = async () => getBusDataStreaming('HsinChu', BusDataType.RealTimeByFrequency, '0007')
const getBusDataInRealTimeNearStopStreaming = async () => getBusDataStreaming('HsinChu', BusDataType.RealTimeNearStop, '0007')
const getBusDataInEstimatedTimeOfArrivalStreaming = async () => getBusDataStreaming('HsinChu', BusDataType.EstimatedTimeOfArrival, '0007')
const getBusDataInRealTimeByFrequency = async () => getBusData('HsinChu', BusDataType.RealTimeByFrequency, '0007')
const getBusDataInRealTimeNearStop = async () => getBusData('HsinChu', BusDataType.RealTimeNearStop, '0007')
const getBusDataInEstimatedTimeOfArrival = async () => getBusData('HsinChu', BusDataType.EstimatedTimeOfArrival, '0007')
const getBusDataInDisplayStopOfRoute = async () => getBusData('Taipei', BusDataType.DisplayStopOfRoute, '204')

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
}
