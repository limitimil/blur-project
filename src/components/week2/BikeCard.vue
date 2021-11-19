<template>
  <q-card class="card">
    <q-card-section>
      <div class="text-h6">Our Changing Planet</div>
      <div class="text-subtitle2">by John Doe</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-btn flat round color="red" icon="favorite" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'BikeCard',
  components: {
  },
  props: {
  },
})
</script>
<style>
.card {
  width: 335px;
  height: 160px;
}
</style>
