import FetchableService from './fetchableService'
import Tourism from '@/data-fetch/tourism'

export default class TourismService extends FetchableService {
  protected builderClass: any = Tourism;
}
