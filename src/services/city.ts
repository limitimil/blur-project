import lodash from 'lodash'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const taiwanAreaGetter = require('taiwan-area-from-lnglat')

const Mapping = [
  {
    name: '臺北市',
    key: 'Taipei',
  },
  {
    name: '新北市',
    key: 'NewTaipei',
  },
  {
    name: '桃園市',
    key: 'Taoyuan',
  },
  {
    name: '臺中市',
    key: 'Taichung',
  },
  {
    name: '臺南市',
    key: 'Tainan',
  },
  {
    name: '高雄市',
    key: 'Kaohsiung',
  },
  {
    name: '基隆市',
    key: 'Keelung',
  },
  {
    name: '新竹市',
    key: 'Hsinchu',
  },
  {
    name: '新竹縣',
    key: 'HsinchuCounty',
  },
  {
    name: '苗栗縣',
    key: 'MiaoliCounty',
  },
  {
    name: '彰化縣',
    key: 'ChanghuaCounty',
  },
  {
    name: '南投縣',
    key: 'NantouCounty',
  },
  {
    name: '雲林縣',
    key: 'YunlinCounty',
  },
  {
    name: '嘉義縣',
    key: 'ChiayiCounty',
  },
  {
    name: '嘉義市',
    key: 'Chiayi',
  },
  {
    name: '屏東縣',
    key: 'PingtungCounty',
  },
  {
    name: '宜蘭縣',
    key: 'YilanCounty',
  },
  {
    name: '花蓮縣',
    key: 'HualienCounty',
  },
  {
    name: '臺東縣',
    key: 'TaitungCounty',
  },
  {
    name: '金門縣',
    key: 'KinmenCounty',
  },
  {
    name: '澎湖縣',
    key: 'PenghuCounty',
  },
  {
    name: '連江縣',
    key: 'LienchiangCounty',
  },
]

export default class CityService {
  public getCityByName(name: string): string {
    const record = lodash.find(Mapping, (element) => element.name === name)
    if (record) {
      return record.key
    }
    throw Error(`Unexpected city name: ${name} `)
  }

  public getCityByLatLng(location: {lng: number, lat: number}): string {
    const r = taiwanAreaGetter.getByLnglat(location.lng, location.lat)
    return this.getCityByName(r.COUNTYNAME)
  }

  public getDecoratedCitiesForQuasarSelect(): any {
    const cities = this.getCities()
    return lodash.map(
      cities,
      (element) => ({
        ...element, label: element.name,
      }),
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getCities(): any[] {
    return Mapping
  }
}
