import { AxiosResponse } from 'axios'
import axios from '@/axios'
import TdxPosition from '@/interface/TdxPosition'
import { TdxFilter } from './tdx/filterDSL'

import TdxRequestBuilder from './tdx/requestBuilder'

// eslint-disable-next-line no-shadow
export enum BusDataType {
  RealTimeByFrequency= 'RealTimeByFrequency',
  RealTimeNearStop= 'RealTimeNearStop',
  EstimatedTimeOfArrival= 'EstimatedTimeOfArrival',
  DisplayStopOfRoute= 'DisplayStopOfRoute', // We should avoid using this.
  StopOfRoute= 'StopOfRoute',
  Stop= 'Stop',
}

// @ts-ignore
function insert(value, index, item) {
  value.splice(index, 0, item)
}

// TODO: need ut to guard magic of urlPath
export default class Bus extends TdxRequestBuilder {
  protected KEY_FOR_ID: string = 'StopID';

  protected FIELDS_FOR_KEYWORD: string[] = [
    'StopName/Zh_tw',
    'StopName/En',
  ];

  protected filter: TdxFilter;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor() {
    super()
    this.filter = new TdxFilter()
  }

  private urlPath: string[] = [
    'MOTC',
    'v2',
    'Bus',
    'City',
  ]

  public withDirection(direction: number): Bus {
    this.filter.regist([`Direction eq ${direction}`])
    return this
  }

  public useStreaming(): Bus {
    const idx = this.urlPath.findIndex((elem) => elem === 'Bus')
    insert(this.urlPath, idx + 1, 'Streaming')
    return this
  }

  public withRouteName(routeName: string): Bus {
    const idx = this.urlPath.length
    insert(this.urlPath, idx, routeName)
    return this
  }

  public withCity(city: string): Bus {
    const idx = this.urlPath.findIndex((elem) => elem === 'City')
    insert(this.urlPath, idx + 1, city)
    return this
  }

  public withType(type: string): Bus {
    const idx = this.urlPath.findIndex((elem) => elem === 'Bus')
    insert(this.urlPath, idx + 1, type)
    return this
  }

  // TODO: DRY along with the withNearBy in data-fetch/bikeStation.ts
  public withNearBy(position: TdxPosition): Bus {
    const key = 'StopPosition'
    const distance = 200
    this.arg = {
      ...this.arg,
      $spatialFilter: `nearBy(${key}, ${position.PositionLat}, ${position.PositionLon}, ${distance})`,
    }
    return this
  }

  public async invoke(): Promise<any[]> {
    if (this.filter.getLength()) {
      this.arg = {
        ...this.arg,
        $filter: this.filter.combineJobs(),
      }
    }
    const url = this.urlPath.join('/')
    const params = {
      $format: 'JSON',
      ...this.arg,
    }

    const res: AxiosResponse<any> = await axios.get(url, { params })
    return res.data
  }
}
