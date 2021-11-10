import Tourism from '@/data-fetch/tourism'

const dataFetcher = new Tourism()
const calcSkip = (count: number, offset: number) => offset * count
export default class TourismService {
  // eslint-disable-next-line class-methods-use-this
  public async top(count: number, offset: number): Promise<any> {
    return dataFetcher.getScenicSpot({ $top: count || 30, $skip: calcSkip(count, offset) })
  }
}
