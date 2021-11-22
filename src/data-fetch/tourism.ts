import { AxiosResponse } from 'axios'
import lodash from 'lodash'
import axios from '@/axios'
import TdxArgument from './interface/TdxArgument'
import { TdxFilter, TdxStatements } from './tdx/filterDSL'
import TdxRequestBuilder from './tdx/requestBuilder'

export default class Tourism extends TdxRequestBuilder {
  protected KEY_FOR_ID: string = 'ID';

  protected FIELDS_FOR_KEYWORD: string[] = [
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

  public async invoke(): Promise<any> {
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
}
