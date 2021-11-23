import BusSchedule from '@/data-fetch/busSchedule'
import FetchableService from './fetchableService'

export default class BusScheduleService extends FetchableService {
  protected builderClass: any = BusSchedule;

  // TODO: review the design
  public busDataType: string | undefined = undefined;

  public setBusDataType(busDataType: string) {
    this.busDataType = busDataType
  }

  // TODO: review the naming
  // TODO: RequestBuilder don't have setBusDataType method
  public async getByUniqId(id: string, key:string = 'RouteID') {
    const arg = {}
    // eslint-disable-next-line new-cap
    let builder = new BusSchedule().withArg(arg)
    builder = builder.withSubset([id])
    // @ts-ignore
    builder.setBusDataType(this.busDataType)
    // @ts-ignore
    builder = builder.withCity(this.city)
    const result = await builder.invoke()
    if (!result.length) {
      throw Error(`cannot grab record for ${key} = ${id}`)
    }
    return result
  }
}
