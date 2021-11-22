<template>
  <q-page>
    <div id="bus">
      <div class="row">
        <div class="col-12">
          <div class="column justify-evenly items-center" style="height:990px">
            <img src="@/assets/logo/bus-en.svg" width="372"/>
            <img src="@/assets/logo/bus-zh.svg" width="253"/>
            <q-select v-model="city" :options="['台北市']" label="選擇縣市" style="width:446px"/>
            <q-btn color="amber" label="START" size="30px"/>
          </div>
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
})
</script>
<style lang="less">
html {
  background: #E5E8E7;
}
#bus {
  height: 100%;
}
.logo {
  margin-top: 120px;
}
.q-footer {
  height: 90px;
  background: #747474;
  font-size: 18px;
}
</style>
