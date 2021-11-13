<template>
  <q-page>
    <div id="travel">
      <div class="row">
        <div class="col-6"></div>
        <div class="col-6">
          <div class="flex items-center q-gutter-md">
            <img src="@/assets/logo/travel.svg" />
            <a href="#">
              <img src="@/assets/icon/collection.svg" />
            </a>
          </div>
          <div class="flex">
            <q-input outlined v-model="ph" label="Label" placeholder="Placeholder" dense />
            <q-input outlined v-model="ph" label="Label" placeholder="Placeholder" dense />
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
