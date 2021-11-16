<template>
  <q-page class="flex flex-center">
    <div>
      <h4>{{ storyId }}</h4>
      <br />
      <h5>city is: {{city}}</h5>
      <q-radio v-model="city" val='Taipei' label='Taipei'> 臺北市 </q-radio>
      <q-radio v-model="city" val='NewTaipei' label='NewTaipei'> 新北市 </q-radio>
      <q-radio v-model="city" val='Taoyuan' label='Taoyuan'>桃園市</q-radio>
      <q-radio v-model="city" val='Taichung' label='Taichung'>臺中市</q-radio>
      <q-radio v-model="city" val='Tainan' label='Tainan'>臺南市</q-radio>
      <q-radio v-model="city" val='Kaohsiung' label='Kaohsiung'>高雄市</q-radio>
      <q-radio v-model="city" val='Keelung' label='Keelung'>基隆市</q-radio>
      <q-radio v-model="city" val='Hsinchu' label='Hsinchu'>新竹市</q-radio>
      <q-radio v-model="city" val='HsinchuCounty' label='HsinchuCounty'>新竹縣</q-radio>
      <q-radio v-model="city" val='MiaoliCounty' label='MiaoliCounty'>苗栗縣</q-radio>
      <q-radio v-model="city" val='ChanghuaCounty' label='ChanghuaCounty'>彰化縣</q-radio>
      <q-radio v-model="city" val='NantouCounty' label='NantouCounty'>南投縣</q-radio>
      <q-radio v-model="city" val='YunlinCounty' label='YunlinCounty'>雲林縣</q-radio>
      <q-radio v-model="city" val='ChiayiCounty' label='ChiayiCounty'>嘉義縣</q-radio>
      <q-radio v-model="city" val='Chiayi' label='Chiayi'>嘉義市</q-radio>
      <q-radio v-model="city" val='PingtungCounty' label='PingtungCounty'>屏東縣</q-radio>
      <q-radio v-model="city" val='YilanCounty' label='YilanCounty'>宜蘭縣</q-radio>
      <q-radio v-model="city" val='HualienCounty' label='HualienCounty'>花蓮縣</q-radio>
      <q-radio v-model="city" val='TaitungCounty' label='TaitungCounty'>臺東縣</q-radio>
      <q-radio v-model="city" val='KinmenCounty' label='KinmenCounty'>金門縣</q-radio>
      <q-radio v-model="city" val='PenghuCounty' label='PenghuCounty'>澎湖縣</q-radio>
      <q-radio v-model="city" val='LienchiangCounty' label='LienchiangCounty'>連江縣</q-radio>
      <TaiwanMap v-model:city='city'/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import TaiwanMap from '@/components/taiwanMap/index.vue'

export default {
  name: 'ComponentStory',
  components: {
    TaiwanMap,
  },
  setup() {
    const route = useRoute()

    const storyId = ref(route.params.storyId)

    const city = ref('Taipei')

    return {
      storyId,
      city,
    }
  },
}
</script>
