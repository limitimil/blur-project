// eslint-disable-next-line max-classes-per-file
import Bus, { BusDataType } from '@/data-fetch/bus'
import TdxPosition from '@/interface/TdxPosition'
import FetchableService from './fetchableService'

// TODO: extract common part from BusStop in services/dynamicBusStop.ts
export interface BusStop {
  StopID: string,
  StopNameZh: string,
  StopBoarding: number,
  StopSequence: number,

  EstimateTime?: number,
  EstimateArrivalTimeStamp?: number,
  StopStatus: number,

  StopPosition: TdxPosition,
}

class BusDataFetcherWithStopType extends Bus {

  private constructor() {
    super()
    this.withType(BusDataType.Stop)
  }
}
export default class BikeStationService extends FetchableService {
  protected builderClass: any = BusDataFetcherWithStopType;
}
