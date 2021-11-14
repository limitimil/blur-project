/* eslint-disable @typescript-eslint/no-this-alias */
import $ from 'jquery'
import lodash from 'lodash'
import {
  ref, computed, onMounted, watch,
} from 'vue'
import CityService from '@/services/city'

const TDX_PLACE_DATA = new CityService().getCities()
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
    place: '臺中市',
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
    place: '臺東縣',
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
  props: ['city'],
  emits: ['update:city'],
  // @ts-ignore
  setup(props, { emit }) {
    const filter = ref('')
    const placeData = ref(PLACE_DATA)

    const newArea = computed(() => {
      const result = placeData.value.filter((obj: any) => obj.tag === filter.value)
      if (result.length === 0) {
        return null
      }
      return result[0]
    })

    function deSelectAll(attr: string) {
      document.querySelectorAll('#taiwan-map path').forEach((elem) => {
        elem.removeAttribute(attr)
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function select(tdxCode: string) {
      console.log(tdxCode)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tdxName = lodash.find(TDX_PLACE_DATA, ['key', props.city])?.name
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [code, name] = [
          lodash.find(PLACE_DATA, ['place', tdxName])?.tag,
          tdxName,
      ]
      console.log(tdxCode, tdxName, code, name)

      if (code) {
        const selectedNode = document.querySelector(`#taiwan-map path [data-name=${code}`)
        if (selectedNode) {
          selectedNode.setAttribute('selected-region', 'true')
        }
      }
    }

    onMounted(() => {
      // eslint-disable-next-line func-names,@typescript-eslint/no-unused-vars
      $('path').on('click', function (e: any) {
        const currentNode: any = this
        // @ts-ignore
        const tagname: string = $(currentNode).attr('data-name')
        filter.value = tagname
        deSelectAll('selected-region')
        currentNode.setAttribute('selected-region', 'true')
      })

      if (props.city) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [tdxCode, tdxName] = [
          props.city,
          lodash.find(TDX_PLACE_DATA, ['key', props.city])?.name,
        ]
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [code, name] = [
          lodash.find(PLACE_DATA, ['place', tdxName])?.tag,
          tdxName,
        ]

        if (code) {
          const selectedNode = document.querySelector(`#taiwan-map path [data-name=${code}`)
          if (selectedNode) {
            selectedNode.setAttribute('selected-region', 'true')
          }
        }
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    watch(filter, (newVal, oldVal) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [code, name] = [
        newVal,
          lodash.find(PLACE_DATA, ['tag', newVal])?.place,
      ]
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [tdxCode, tdxName] = [
        // @ts-ignore
        lodash.find(TDX_PLACE_DATA, ['name', name])?.key,
        name,
      ]
      // eslint-disable-next-line no-param-reassign
      emit('update:city', tdxCode)
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    watch(props.city, (newVal, oldVal) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [tdxCode, tdxName] = [
        // @ts-ignore
        newVal,
        lodash.find(TDX_PLACE_DATA, ['key', props.city])?.name,
      ]
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [code, name] = [
        lodash.find(PLACE_DATA, ['place', tdxName])?.tag,
        tdxName,
      ]
      if (code) {
        filter.value = code

        const selectedNode = document.querySelector(`#taiwan-map path [data-name=${code}`)
        deSelectAll('selected-region')
        if (selectedNode) {
          selectedNode.setAttribute('selected-region', 'true')
        }
      }
    })

    return {
      filter,
      placeData,
      newArea,
    }
  },
}
