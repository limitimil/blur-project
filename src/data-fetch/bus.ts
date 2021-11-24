import { AxiosResponse } from 'axios'
import axios from '@/axios'
import TdxArgument from './tdx/interface/TdxArgument'
import TdxRequestBuilder from './tdx/requestBuilder'

export enum BusDataType {
  RealTimeByFrequency= 'RealTimeByFrequency',
  RealTimeNearStop= 'RealTimeNearStop',
  EstimatedTimeOfArrival= 'EstimatedTimeOfArrival',
  DisplayStopOfRoute= 'DisplayStopOfRoute',
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
