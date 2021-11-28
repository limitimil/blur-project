import { AxiosResponse } from 'axios'
import axios from '@/axios'
import TdxArgument from './tdx/interface/TdxArgument'
import { TdxFilter } from './tdx/filterDSL'

// eslint-disable-next-line no-shadow
export enum BusDataType {
  RealTimeByFrequency= 'RealTimeByFrequency',
  RealTimeNearStop= 'RealTimeNearStop',
  EstimatedTimeOfArrival= 'EstimatedTimeOfArrival',
  DisplayStopOfRoute= 'DisplayStopOfRoute', // We should avoid using this.
  StopOfRoute= 'StopOfRoute',
}

export async function getBusData(city: string, type: BusDataType, routeName: string): Promise<any[]> {
  const url = `MOTC/v2/Bus/${type}/City/${city}/${routeName}`
  const params = {
    $format: 'JSON',
  }
  const res: AxiosResponse<any> = await axios.get(url, { params })
  return res.data
}
export async function getBusDataStreaming(city: string, type: BusDataType, routeName: string): Promise<any[]> {
  const url = `MOTC/v2/Bus/${type}/Streaming/City/${city}/${routeName}`
  const params = {
    $format: 'JSON',
  }
  const res: AxiosResponse<any> = await axios.get(url, { params })
  return res.data
}

// @ts-ignore
function insert(value, index, item) {
  value.splice(index, 0, item)
}

// TODO: need ut to guard magic of urlPath
export default class Bus {
  private arg: TdxArgument = {}

  protected filter: TdxFilter;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor() {
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

  private insertCity(city: string): void{
    const idx = this.urlPath.findIndex((elem) => elem === 'City')
    insert(this.urlPath, idx + 1, city)
  }

  private insertType(type: string): void{
    const idx = this.urlPath.findIndex((elem) => elem === 'Bus')
    insert(this.urlPath, idx + 1, type)
  }

  public async invoke(city: string, type: BusDataType): Promise<any[]> {
    if (this.filter.getLength()) {
      this.arg = {
        ...this.arg,
        $filter: this.filter.combineJobs(),
      }
    }
    this.insertCity(city)
    this.insertType(type)
    const url = this.urlPath.join('/')
    const params = {
      $format: 'JSON',
      ...this.arg,
    }

    const res: AxiosResponse<any> = await axios.get(url, { params })
    return res.data
  }
}
