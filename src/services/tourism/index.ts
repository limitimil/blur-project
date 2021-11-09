import Tourism from '@/data-fetch/tourism'

const dataFetcher = new Tourism()
export default class TourismService {
  public async top(): Promise<any> {
    return dataFetcher.getScenicSpot({})
  }
}
