import lodash from 'lodash'
import Bus, { BusDataType } from '@/data-fetch/bus'

/* TODO: define enums for
 - StopBoarding
 - StopStatus
*/
interface BusStop {
  StopID: string,
  StopNameZh: string,
  StopBoarding: number,
  StopSequence: number,

  EstimateTime?: number,
  EstimateArrivalTimeStamp?: number,
  StopStatus: number,
}

// TODO: This interface is similar to components/_week3Utils/interface/BusStop.ts. Try to refactor them.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DynamicBusStops {
  RouteID: string,
  RouteName: string,
  DepartureStopNameZh: string,
  DestinationStopNameZh: string,
  Direction: number,
  Stops: BusStop[],
}

export default class DynamicBusStopService {
  protected city: string | undefined = undefined;

  protected routeName: string | undefined = undefined;

  protected direction: number = 0;

  private setZh(value: any, key: string): DynamicBusStops {
    const rawStr = value[key].Zh_tw
    // eslint-disable-next-line no-param-reassign
    value[key] = rawStr
    return value
  }

  private calculateStop(value: any): BusStop {
    return {
      StopID: value.StopID,
      StopNameZh: value.StopName.Zh_tw,
      StopBoarding: value.StopBoarding,
      StopSequence: value.StopSequence,

      EstimateTime: value.EstimateTime,
      EstimateArrivalTimeStamp: value.EstimateArrivalTimeStamp,
      StopStatus: value.StopStatus,
    }
  }

  private calculateDeptDest(value: any): DynamicBusStops {
    if (value.DestinationStopName && value.DepartureStopName) {
      // eslint-disable-next-line no-param-reassign
      value.DestinationStopNameZh = value.DestinationStopName.Zh_tw
      // eslint-disable-next-line no-param-reassign
      value.DepartureStopNameZh = value.DepartureStopName.Zh_tw
      return value
    }
    const len = value.Stops.length
    // eslint-disable-next-line no-param-reassign
    value.DestinationStopNameZh = value.Stops[0].StopName.Zh_tw
    // eslint-disable-next-line no-param-reassign
    value.DepartureStopNameZh = value.Stops[len - 1].StopName.Zh_tw
    return value
  }

  private async fetchStops(): Promise<any> {
    let builder = new Bus()
    // @ts-ignore
    builder = builder.withDirection(this.direction)
    // @ts-ignore
    builder = builder.withRouteName(this.routeName)
    // @ts-ignore
    const result = await builder.invoke(this.city, BusDataType.StopOfRoute)
    if (result.length !== 1) {
      throw Error(`expect stop of route result should be in length 1, but get ${result.length}`)
    }
    return result[0]
  }

  private async fetchEstimatedTime(): Promise<any[]> {
    let builder = new Bus()
    // @ts-ignore
    builder = builder.withDirection(this.direction)
    // @ts-ignore
    builder = builder.withRouteName(this.routeName)
    // @ts-ignore
    return builder.invoke(this.city, BusDataType.EstimatedTimeOfArrival)
  }

  public async fetch(): Promise<DynamicBusStops[]> {
    if (!this.city || !this.routeName || this.direction === undefined) {
      throw Error(`Service class is not able to fetch data without city and routeName:
                  city: ${this.city},
                  routeName: ${this.routeName},
                  direction: ${this.direction},
                  `)
    }
    let stops = await this.fetchStops()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const estimatedTime = await this.fetchEstimatedTime()
    // eslint-disable-next-line arrow-body-style
    stops = this.calculateDeptDest(stops)
    stops.Stops = lodash.map(
      lodash.zip(stops.Stops, estimatedTime),
      ([stop, time]) => {
        const result = {
          ...this.calculateStop(stop),
          ...time,
        }
        return result
      },
    )
    stops = this.setZh(stops, 'RouteName')
    return stops
  }

  public setCity(city: string | undefined): void {
    this.city = city
  }

  public setRouteName(routeName: string | undefined): void {
    this.routeName = routeName
  }

  public setDirection(direction: number): void {
    this.direction = direction
  }

  public getStatus() : any {
    return {
      city: this.city,
      routeName: this.routeName,
      direction: this.direction,
    }
  }
}
