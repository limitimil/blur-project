import BikeStation from '@/data-fetch/bikeStation'
import LocalCollection from '@/data-fetch/localCollection'
import TdxPosition from '@/interface/TdxPosition'

const calcSkip = (count: number, offset: number) => offset * count
export default class BikeStationService {
  private count: number = 30;

  private offset: number = 0;

  private city: string | undefined = undefined;

  private keyword: string | undefined= undefined;

  private className: string | undefined= undefined;

  private isCollection: boolean = false;

  private nearByPosition: TdxPosition | undefined = undefined;

  public async fetch(): Promise<any> {
    const arg = { $top: this.count, $skip: calcSkip(this.count, this.offset) }
    let builder = new BikeStation().withArg(arg)
    if (this.isCollection) {
      const collectedIds = new LocalCollection().getCollectedSceneSpotIds()
      if (collectedIds.length) {
        builder = builder.withSubset(collectedIds)
      } else {
        return []
      }
    }
    if (this.className) {
      builder = builder.withClassName(this.className)
    }
    if (this.city) {
      builder = builder.withCity(this.city)
    }
    if (this.nearByPosition) {
      builder = builder.withNearBy(this.nearByPosition)
    }
    if (this.keyword) {
      builder = builder.withKeyword(this.keyword)
    }
    return builder.getBikeStationInvoker()
  }

  public async clean(): Promise<any> {
    this.city = undefined
    this.keyword = undefined
    this.className = undefined
    this.count = 30
    this.offset = 0
  }

  /* TODO:
   * This method is only used by store/tourism.ts,
   * and I think I can find a better way to make this property extraction better.
  */
  public getStatus(): any {
    const { city, keyword, className } = this
    return {
      city, keyword, className,
    }
  }

  public top(count: number): void {
    this.count = count
    this.offset = 0
  }

  public toPage(offset: number): void {
    this.offset = offset
  }

  public useCollection(value: boolean): void {
    this.isCollection = value
  }

  public setCity(city: string | undefined): void {
    this.city = city
  }

  public setClassName(className: string | undefined): void {
    this.className = className
  }

  public setKeyword(keyword: string | undefined): void {
    this.keyword = keyword
  }

  public setNearBy(position: TdxPosition): void {
    this.nearByPosition = position
  }

  // TODO: deprecate this interface
  public byKeyword(keyword: string): void {
    this.keyword = keyword
  }
}
