/* eslint-disable @typescript-eslint/no-this-alias */
import $ from 'jquery'
import { ref, computed } from 'vue'

const PLACE_DATA = [
  {
    tag: 'taipei_city',
    place: '臺北市',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'new_taipei_city',
    place: '新北市',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'taichung_city',
    place: '台中市',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'tainan_city',
    place: '臺南市',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'kaohsiung_city',
    place: '高雄市',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'keelung_city',
    place: '基隆市',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'taoyuan_country',
    place: '桃園市',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'hsinchu_city',
    place: '新竹市',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'hsinchu_country',
    place: '新竹縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'miaoli_country',
    place: '苗栗縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'changhua_country',
    place: '彰化縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'nantou_country',
    place: '南投縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'yunlin_country',
    place: '雲林縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'chiayi_city',
    place: '嘉義市',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'chiayi_country',
    place: '嘉義縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'pingtung_country',
    place: '屏東縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'yilan_country',
    place: '宜蘭縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'hualien_country',
    place: '花蓮縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'taitung_country',
    place: '台東縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'penghu_country',
    place: '澎湖縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'kinmen_country',
    place: '金門縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
  {
    tag: 'lienchiang_country',
    place: '連江縣',
    low: 20,
    high: 24,
    weather: 'Sunny',
  },
]

export default {
  setup() {
    const filter = ref('')
    const placeData = ref(PLACE_DATA)

    const newArea = computed(() => {
      const result = placeData.value.filter((obj: any) => obj.tag === filter.value)
      if (result.length === 0) {
        return null
      }
      return result[0]
    })

    // eslint-disable-next-line func-names,@typescript-eslint/no-unused-vars
    $('path').mouseenter(function (e: any) {
      // @ts-ignore
      const currentNode: any = this
      // @ts-ignore
      const tagname: string = $(currentNode).attr('data-name')
      filter.value = tagname
    })
    return {
      filter,
      placeData,
      newArea,
    }
  },
}
