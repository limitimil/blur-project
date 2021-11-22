import { AxiosResponse } from 'axios'
import axios from '@/axios'
import TdxPosition from '@/interface/TdxPosition'
import TdxArgument from './tdx/interface/TdxArgument'
import TdxRequestBuilder from './tdx/requestBuilder'

export default class BikeStation extends TdxRequestBuilder {
  protected KEY_FOR_ID: string = 'ID';

  protected FIELDS_FOR_KEYWORD: string[] = [
    'StationName/Zh_tw',
    'StationName/En',
    'StationAddress/Zh_tw',
    'StationAddress/En',
  ];

  public withNearBy(position: TdxPosition): BikeStation {
    const key = 'StationPosition'
    const distance = 200
    this.arg = {
      ...this.arg,
      $spatialFilter: `nearBy(${key}, ${position.PositionLat}, ${position.PositionLon}, ${distance})`,
    }
    return this
  }

  public async invoke(): Promise<any> {
    if (this.filter.getLength()) {
      this.arg = {
        ...this.arg,
        $filter: this.filter.combineJobs(),
      }
    }
    if (!this.city) {
      throw Error('To get bike station, please include city information in your query')
    }
    return this.getBikeStationByCity(this.arg, this.city)
  }

  private async getBikeStationByCity(arg: TdxArgument, city: string): Promise<any> {
    const url = `MOTC/v2/Bike/Station/${city}`
    const params = {
      $format: 'JSON',
      ...arg,
    }
    const res: AxiosResponse<any> = await axios.get(url, { params })
    return res.data
  }
}
