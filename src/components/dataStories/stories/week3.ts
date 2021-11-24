import BusRouteService from '@/services/busRoute'

const topFiveBusRouteInTaipei = async () => {
  const service = new BusRouteService()
  service.top(5)
  service.setCity('Taipei')
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

export default {
  topFiveBusRouteInTaipei,
  topFiveBusRouteInTaipeiWithKeyword,
  getBusRouteByRouteId,
}
