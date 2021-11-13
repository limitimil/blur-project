import Tourism from '@/data-fetch/tourism'
import LocalCollection from '@/data-fetch/localCollection'

const calcSkip = (count: number, offset: number) => offset * count
export default class TourismService {
  private count: number = 30;

  private offset: number = 0;

  private city: string | undefined = undefined;

  private keyword: string | undefined= undefined;

  private className: string | undefined= undefined;

  private isCollection: boolean = false;

  public async fetch(): Promise<any> {
    const arg = { $top: this.count, $skip: calcSkip(this.count, this.offset) }
    let builder = new Tourism().withArg(arg)
    if (this.isCollection) {
      const collectedIds = new LocalCollection().getCollectedSceneSpotIds()
      console.log(collectedIds)
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
    if (this.keyword) {
      builder = builder.withKeyword(this.keyword)
    }
    return builder.getScenicSpotInvoker()
  }

  public async clean(): Promise<any> {
    this.city = undefined
    this.keyword = undefined
    this.className = undefined
    this.count = 30
    this.offset = 0
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

  // TODO: deprecate this interface
  public byKeyword(keyword: string): void {
    this.keyword = keyword
  }
}
