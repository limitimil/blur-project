import { AxiosResponse } from 'axios'
import lodash from 'lodash'
import axios from '@/axios'
import TdxPosition from '@/interface/TdxPosition'
import TdxArgument from './interface/TdxArgument'
import { TdxFilter, TdxStatements } from './tdx/filterDSL'

const KEY_FOR_ID = 'RouteID'
const FILEDS_FOR_KEYWORD = [
  'RouteName/Zh_tw',
  'RouteName/En',
  'DepartureStopNameZh',
  'DepartureStopNameEn',
  'DestinationStopNameZh',
  'DestinationStopNameEn',
]
export default class BusRoute {
  private arg: TdxArgument = {}

  private city: string | undefined = undefined;

  private className: string | undefined = undefined;

  private keyword: string | undefined = undefined;

  private subset: string[] = [];

  private filter: TdxFilter;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor() {
    this.filter = new TdxFilter()
  }

  // TODO: this builder is not able to collaberate with withKeyword, withClassName
  public withSubset(subset: string[]) :BusRoute {
    this.filter.regist(TdxStatements.filterIdSubset(subset, KEY_FOR_ID))
    return this
  }

  public withArg(arg: TdxArgument): BusRoute {
    this.arg = { ...arg }
    return this
  }

  public withCity(city: string): BusRoute {
    this.city = city
    return this
  }

  public withKeyword(keyword: string): BusRoute {
    this.filter.regist(TdxStatements.filterKeyword(keyword, FILEDS_FOR_KEYWORD))
    return this
  }

  public withClassName(className: string): BusRoute {
    this.filter.regist(TdxStatements.filterClassName(className))
    return this
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public withNearBy(position: TdxPosition): BusRoute {
    throw Error('we currently not support withNearBy command')
  }

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

  // TODO: find a better place to reside these methods
  public byClassName(className: string): TdxArgument {
    const getKeywordBlock = (field: string) => `${field} eq '${className}'`
    const filterStr = `${getKeywordBlock('Class1')} or ${getKeywordBlock('Class2')} or ${getKeywordBlock('Class3')}`
    return {
      $filter: this.arg.$filter ? `${this.arg.$filter} and ${filterStr}` : filterStr,
    }
  }

  public fieldsByKeyword(keyword: string, fields: string[]): TdxArgument {
    const getKeywordBlock = (field: string) => `contains(${field}, '${keyword}')`
    if (fields.length === 0) {
      return {}
    }
    const firstFilterStr = getKeywordBlock(fields[0])
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filterStr = lodash.reduce(fields.slice(1), (result, value, key) => `${result} or ${getKeywordBlock(value)}`, firstFilterStr)
    return {
      $filter: this.arg.$filter ? `${this.arg.$filter} and ${filterStr}` : filterStr,
    }
  }

  public bySubset(subset: string[]) :TdxArgument {
    const getKeywordBlock = (key: string) => `ID eq '${key}'`
    if (subset.length === 0) {
      return {}
    }
    const firstFilterStr = getKeywordBlock(subset[0])
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filterStr = lodash.reduce(subset.slice(1), (result, value, key) => `${result} or ${getKeywordBlock(value)}`, firstFilterStr)
    return {
      $filter: filterStr,
    }
  }
}
