<template>
  <q-page>
    <div id="travel">
      <div class="row">
        <div class="col-6"></div>
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
              <q-input outlined v-model="ph" placeholder="想去哪兒？">
                <template v-slot:append>
                  <span class="q-mr-xs">|</span>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-4">
              <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
              </q-card>
            </div>
            <div class="col-4">
              <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
              </q-card>
            </div>
            <div class="col-4">
              <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
              </q-card>
            </div>
            <div class="col-4">
              <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
              </q-card>
            </div>
            <div class="col-4">
              <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
              </q-card>
            </div>
            <div class="col-4">
              <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"/>
              </q-card>
            </div>
            <div class="col-12">
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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Travel',
  props: {
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
