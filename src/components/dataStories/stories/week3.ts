import BusRouteService from '@/services/busRoute'
import BusScheduleService from '@/services/busSchedule'

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
]

const getBusScheduleWithRealTimeByFrequency = async () => {
  const service = new BusScheduleService()
  service.setCity('HsinChu')
  service.setBusDataType('RealTimeByFrequency')
  return service.getByUniqId('0007')
}
const getBusScheduleWithRealTimeNearStop = async () => {
  const service = new BusScheduleService()
  service.setCity('HsinChu')
  service.setBusDataType('RealTimeNearStop')
  return service.getByUniqId('0007')
}
const getBusScheduleWithEstimatedTimeOfArrival = async () => {
  const service = new BusScheduleService()
  service.setCity('HsinChu')
  service.setBusDataType('EstimatedTimeOfArrival')
  return service.getByUniqId('0007')
}
export default {
  topFiveBusRouteInTaipei,
  topFiveBusRouteInHsinChu,
  topFiveBusRouteInTaipeiWithKeyword,
  getBusRouteByRouteId,
  getBusScheduleWithRealTimeByFrequency,
  getBusScheduleWithRealTimeNearStop,
  getBusScheduleWithEstimatedTimeOfArrival,
}
