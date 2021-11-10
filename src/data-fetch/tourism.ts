import { AxiosResponse } from 'axios'
import axios from '@/axios'

interface ScenicSpotArgument {
  $top?: number;
  $skip?: number;
}

export default class Tourism {
  public async getScenicSpot(arg: ScenicSpotArgument): Promise<any> {
    const url = 'MOTC/v2/Tourism/ScenicSpot'
    const params = {
      format: 'JSON',
      ...arg,
    }
    const res: AxiosResponse<any> = await axios.get(url, { params })
    return res.data
  }
}
