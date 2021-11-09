import Tourism from '@/data-fetch/tourism'

const dataFetcher = new Tourism()
export default class TourismService {
  // eslint-disable-next-line class-methods-use-this
  public async top(count: number): Promise<any> {
    return dataFetcher.getScenicSpot({ $top: count || 30 })
  }
}
