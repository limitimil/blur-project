<template>
  <q-card class="card">
    <img :src="value?.Picture?.PictureUrl1" alt="">
    <q-card-section>
      <div class="row justify-between">
        <div class="card-header">#{{value?.City}}</div>
        <div class="collect-btn">Collect</div>
      </div>
      <div class="row card-tags justify-between">
        <q-badge>badge here</q-badge>
      </div>
      <div class="row card-title">{{value?.Name}}</div>
      <ul>
        <li v-for="item in Object.entries(value)" :key="item"> {{item}}</li>
      </ul>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { ref } from 'vue'
import LocalCollection from '@/data-fetch/localCollection'

export default {
  name: 'Card',

  props: [
    'value',
  ],

  components: {
  },

  setup(props: any) {
    const collection = new LocalCollection()
    const isSaved = ref(collection.getCollectedSceneSpotIds().includes(props.value.ID))
    const handleUpdate = (checkBoxValue: boolean) => {
      const id = props.value.ID
      if (checkBoxValue) {
        collection.appendCollectedSceneSpotId(id)
      } else {
        collection.removeCollectedSceneSpotId(id)
      }
    }
    return {
      isSaved,
      handleUpdate,
    }
  },
}

</script>
<styile lang="less" scoped>
.card {
  border-radius: 15px;
}
.card-header {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;

  /* Red */

  color: #E15C6C;
}
</styile>
