import CityService from '@/services/city'

describe('@/services/city', () => {
  it('query city key by location information, 101', () => {
    const service = new CityService()
    const result = service.getCityByLatLng({
      lng: 121.56165724984085,
      lat: 25.03357704438537,
    })
    expect(result).toBe('Taipei')
  })
})
