<template>
  <q-page>
    <div id="bike">
      <div class="row">
        <div class="col-12">
          <BikeCard />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent, defineAsyncComponent, ref, computed,
} from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Bike',
  components: {
    BikeCard: defineAsyncComponent(() => import('@/components/week2/BikeCard.vue')),
  },
  props: {
  },
})
</script>
<style>
.bike-card {
  width: 335px;
  height: 160px;
}
</style>
