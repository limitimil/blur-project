import { AxiosResponse } from 'axios'
import lodash from 'lodash'
import axios from '@/axios'
import TdxArgument from './interface/TdxArgument'
import { TdxFilter, TdxStatements } from './tdx/filterDSL'

export default class BikeStation {
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
  public withSubset(subset: string[]) :BikeStation {
    this.filter.regist(TdxStatements.filterIdSubset(subset))
    return this
  }

  public withArg(arg: TdxArgument): BikeStation {
    this.arg = { ...arg }
    return this
  }

  public withCity(city: string): BikeStation {
    this.city = city
    return this
  }

  public withKeyword(keyword: string): BikeStation {
    this.filter.regist(TdxStatements.filterKeyword(keyword))
    return this
  }

  public withClassName(className: string): BikeStation {
    this.filter.regist(TdxStatements.filterClassName(className))
    return this
  }

  public async getBikeStationInvoker(): Promise<any> {
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
