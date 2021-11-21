import BikeStation from '@/data-fetch/bikeStation'
import FetchableService from './fetchableService'

export default class BikeStationService extends FetchableService {
  protected builderClass: any = BikeStation;
}
