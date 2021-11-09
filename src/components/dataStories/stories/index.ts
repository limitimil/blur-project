import TourismService from '@/services/tourism'

const topFiveRecordWithOffsetTwo = async () => {
  const service = new TourismService()
  return service.top(5, 2)
}

export default {
  topFiveRecordWithOffsetTwo,
}
