import TdxPosition from '@/interface/TdxPosition'
import TdxLang from '@/interface/TdxLang'

export default interface BusStop {
  StopID: string,
  StopName: TdxLang,
  StopSequence: number,
  StopPosition: TdxPosition,
}
