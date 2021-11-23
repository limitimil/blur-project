import { AxiosResponse } from 'axios'
import axios from '@/axios'
import TdxArgument from './interface/TdxArgument'
import TdxRequestBuilder from './tdx/requestBuilder'

export default class BusRoute extends TdxRequestBuilder {
  protected KEY_FOR_ID: string = 'RouteID';

  protected FIELDS_FOR_KEYWORD: string[] = [
    'RouteName/Zh_tw',
    'RouteName/En',
    'DepartureStopNameZh',
    'DepartureStopNameEn',
    'DestinationStopNameZh',
    'DestinationStopNameEn',
  ];

  public async invoke(): Promise<any> {
    if (this.filter.getLength()) {
      this.arg = {
        ...this.arg,
        $filter: this.filter.combineJobs(),
      }
    }
    if (!this.city) {
      throw Error('To get bus route, please include city information in your query')
    }
    return this.getBusRouteByCity(this.arg, this.city)
  }

  private async getBusRouteByCity(arg: TdxArgument, city: string): Promise<any> {
    const url = `MOTC/v2/Bus/Route/City/${city}`
    const params = {
      $format: 'JSON',
      ...arg,
    }
    const res: AxiosResponse<any> = await axios.get(url, { params })
    return res.data
  }
}
