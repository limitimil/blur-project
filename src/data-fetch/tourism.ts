import { AxiosResponse } from 'axios'
import lodash from 'lodash'
import axios from '@/axios'
import TdxArgument from './interface/TdxArgument'
import { TdxFilter, TdxStatements } from './tdx/filterDSL'

const FILEDS_FOR_KEYWORD = [
  'Name',
  'DescriptionDetail',
  'Description',
  'Address',
  'Class1',
  'Class2',
  'Class3',
  'Level',
  'Remarks',
  'Keyword',
  'City',
];
export default class Tourism {
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
  public withSubset(subset: string[]) :Tourism {
    this.filter.regist(TdxStatements.filterIdSubset(subset))
    return this
  }

  public withArg(arg: TdxArgument): Tourism {
    this.arg = { ...arg }
    return this
  }

  public withCity(city: string): Tourism {
    this.city = city
    return this
  }

  public withKeyword(keyword: string): Tourism {
    this.filter.regist(TdxStatements.filterKeyword(keyword, FILEDS_FOR_KEYWORD))
    return this
  }

  public withClassName(className: string): Tourism {
    this.filter.regist(TdxStatements.filterClassName(className))
    return this
  }

  public async getScenicSpotInvoker(): Promise<any> {
    if (this.filter.getLength()) {
      this.arg = {
        ...this.arg,
        $filter: this.filter.combineJobs(),
      }
    }
    console.log(this.arg.$filter)
    if (this.city) {
      return this.getScenicSpotByCity(this.arg, this.city)
    }
    return this.getScenicSpot(this.arg)
  }

  private async getScenicSpotByCity(arg: TdxArgument, city: string): Promise<any> {
    const url = `MOTC/v2/Tourism/ScenicSpot/${city}`
    const params = {
      $format: 'JSON',
      ...arg,
    }
    const res: AxiosResponse<any> = await axios.get(url, { params })
    return res.data
  }

  private async getScenicSpot(arg: TdxArgument): Promise<any> {
    const url = 'MOTC/v2/Tourism/ScenicSpot'
    const params = {
      $format: 'JSON',
      ...arg,
    }
    const res: AxiosResponse<any> = await axios.get(url, { params })
    return res.data
  }

  public async getScenicSpotByKeywordCity(
    arg: TdxArgument, keyword: string, city: string,
  ): Promise<any> {
    const fields = [
      'Name',
      'DescriptionDetail',
      'Description',
      'Address',
      'Class1',
      'Class2',
      'Class3',
      'Level',
      'Remarks',
      'Keyword',
      'City',
    ]
    const newArg = {
      ...arg,
      ...this.fieldsByKeyword(keyword, fields),
    }
    return this.getScenicSpotByCity(newArg, city)
  }

  public async getScenicSpotByKeyword(arg: TdxArgument, keyword: string): Promise<any> {
    const fields = [
      'Name',
      'DescriptionDetail',
      'Description',
      'Address',
      'Class1',
      'Class2',
      'Class3',
      'Level',
      'Remarks',
      'Keyword',
      'City',
    ]
    const newArg = {
      ...arg,
      ...this.fieldsByKeyword(keyword, fields),
    }
    return this.getScenicSpot(newArg)
  }

  // TODO: consider city, keyword, classname
  public async getScenicSpotByClassName(arg: TdxArgument, className: string): Promise<any> {
    const newArg = {
      ...arg,
      ...this.byClassName(className),
    }
    return this.getScenicSpot(newArg)
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
