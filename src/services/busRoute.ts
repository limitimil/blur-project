import BusRoute from '@/data-fetch/busRoute'
import FetchableService from './fetchableService'

export default class BusRouteService extends FetchableService {
  protected builderClass: any = BusRoute;

  // TODO: try to extract this method to FetchableService
  public async getAll(): Promise<any> {
    const arg = {}
    // eslint-disable-next-line new-cap
    let builder = new this.builderClass().withArg(arg)
    if (this.city) {
      builder = builder.withCity(this.city)
    }
    if (this.keyword) {
      builder = builder.withKeyword(this.keyword)
    }
    return builder.invoke()
  }

  public async getByUniqId(id: string, key:string = 'RouteID') {
    const arg = { $top: 1 }
    // eslint-disable-next-line new-cap
    let builder = new BusRoute().withArg(arg)
    builder = builder.withSubset([id])
    // @ts-ignore
    builder = builder.withCity(this.city)
    const result = await builder.invoke()
    if (!result.length) {
      throw Error(`cannot grab record for ${key} = ${id}`)
    }
    return result[0]
  }
}
