import BusStop from '@/components/_week3Utils/interface/BusStop'
import { BusDataType, getBusData } from '@/data-fetch/bus'

// TODO: this handler should be refactored as an action of some store
// eslint-disable-next-line import/prefer-default-export
export async function drawBusStopOnMap(city: string, routeName: string, direction: string | number, gMapStore: any) {
  const stopCollection = await getBusData(city, BusDataType.DisplayStopOfRoute, routeName)
  const selectedDirection = stopCollection[parseInt(direction.toString(), 10)]
  const { Stops } = selectedDirection
  Stops.forEach((element: BusStop) => {
    gMapStore.dispatch('markTdxPosition', element.StopPosition)
  })
}
