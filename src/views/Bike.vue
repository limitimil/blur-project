<template>
  <q-page>
    <div id="bike">
      <div class="row">
        <div class="col-12">
          <q-card class="bike-card">
            123
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Bike',
  components: {
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
