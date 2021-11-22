import BusRoute from '@/data-fetch/busRoute'
import FetchableService from './fetchableService'

export default class BusRouteService extends FetchableService {
  protected builderClass: any = BusRoute;

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
