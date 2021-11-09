import { AxiosResponse } from 'axios'
import axios from '@/axios'

interface ScenicSpotArgument {
    top: number,
}

export default class Tourism {
  public async getScenicSpot(ScenicSpotArgument arg): Promise<any> {
    const url = 'MOTC/v2/Tourism/ScenicSpot'
    const params = {
        format: "JSON",
        ...arg
    }
    const res: AxiosResponse<any> = await axios.get(url, params)
    return res.data
  }
}

