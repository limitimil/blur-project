<template>
  <q-page>
    <div id="travel">
      <div class="row">
        <div class="hack">hack</div>
      </div>
      <div class="row">
        <div class="col-6">
          <TaiwanMap @update:city="updateQueryMethods.city"></TaiwanMap>
        </div>
        <div class="col-6">
          <div class="row q-col-gutter-md" style="width:586px">
            <div class="col-12">
              <div class="flex items-center q-gutter-md">
                <img src="@/assets/logo/travel.svg" width="506"/>
                <a href="#">
                  <img src="@/assets/icon/collection.svg" />
                </a>
              </div>
            </div>
            <div class="col-4">
              <q-input outlined v-model="ph" placeholder="類別" />
            </div>
            <div class="col-8">
              <q-input outlined v-model="keyword" placeholder="想去哪兒？" @update:model-value="updateQueryMethods.keyword">
                <template v-slot:append>
                  <span class="q-mr-xs">|</span>
                  <q-icon name="search" @click="top"/>
                </template>
              </q-input>
            </div>
            <div v-for="item in data" :key="item.ID" class="col-4">
              <Card :value="item"/>
            </div>
            <div class="col-4" v-if="!data.length">
              <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
              </q-card>
            </div>
            <div class="col-4" v-if="!data.length">
              <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
              </q-card>
            </div>
            <div class="col-4" v-if="!data.length">
              <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
              </q-card>
            </div>
            <div class="col-4" v-if="!data.length">
              <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
              </q-card>
            </div>
            <div class="col-4" v-if="!data.length">
              <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
              </q-card>
            </div>
            <div class="col-4" v-if="!data.length">
              <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
              </q-card>
            </div>
            <div class="col-12" v-if="!data.length">
              <div class="flex justify-center">
                <img src="@/assets/icon/suggest.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import TaiwanMap from '@/components/taiwanMap/index.vue'
import Card from '@/components/_week1Utils/Card.vue'

export default defineComponent({
  name: 'Travel',
  components: {
    TaiwanMap,
    Card,
  },
  props: {
  },
  setup() {
    const store = useStore()
    const keyword = ref('')

    const data = computed(() => store.getters.content)
    const updateQueryMethods = {
      city: (value: string) => store.commit('appendQuery', { city: value }),
      className: (value: string) => store.commit('appendQuery', { className: value }),
      keyword: (value: string) => store.commit('appendQuery', { keyword: value }),
    }
    const top = () => store.dispatch('top')
    return {
      data,
      updateQueryMethods,
      keyword,
      top,
    }
  },
})
</script>
<style>
html {
  height: 100%;
}
#travel {
  background-image: url("../assets/bg/sky.svg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>
