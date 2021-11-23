<template>
  <q-page>
    <q-header v-if="showAdvancedSearch" elevated class="text-white">
      <q-toolbar>
        <q-toolbar-title class="flex items-center">
          <img src="@/assets/logo/bus-sm.svg" width="123" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <div id="bus">
      <div v-if="!showAdvancedSearch" class="row">
        <div class="col-12">
          <div class="column justify-evenly items-center" style="height:990px">
            <img src="@/assets/logo/bus-en.svg" width="372"/>
            <img src="@/assets/logo/bus-zh.svg" width="253"/>
            <q-select v-model="city" :options="['台北市']" label="選擇縣市" style="width:446px"/>
            <span v-show="invalid" class="text-warn">請先選擇您要查詢的縣市。</span>
            <q-btn color="amber" label="START" size="30px" @click="search"/>
          </div>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-3">
          <q-select v-model="city" :options="['台北市']" label="選擇縣市" style="width:300px"/>
        </div>
        <div class="col-9">
        </div>
        <div class="col-3">
        </div>
        <div class="col-9">
        </div>
      </div>
    </div>

    <q-footer class="text-white">
      <div class="flex flex-center" style="height:inherit">
        © BLUR 2021 │ 六角學院 │ TDX運輸資料流通服務
      </div>
    </q-footer>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent, defineAsyncComponent, ref, watchEffect,
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Bus',
  components: {
  },
  setup() {
    const city = ref('')
    const invalid = ref(false)

    const showAdvancedSearch = ref(false)
    const search = () => {
      console.log(city)
      if (city.value === '') {
        invalid.value = true
      } else {
        invalid.value = false
        showAdvancedSearch.value = true
      }
    }
    return {
      city,
      search,
      invalid,
      showAdvancedSearch,
    }
  },
})
</script>
<style lang="less">
html {
  background: #E5E8E7;
}
.q-header {
  height: 90px;
  background: #747474;
  font-size: 24px;
}
.q-footer {
  height: 90px;
  background: #747474;
  font-size: 18px;
}
.text-warn {
  font-size: 24px;
  color: #D0104C;
}
</style>
