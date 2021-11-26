<template>
  <q-card class="card">
    <q-card-section>
      <h4 v-if="value[0]">0</h4>
      <ul v-if="value[0]">
        <li v-for="item in Object.entries(value[0])" :key="item">
          <ul v-if="item[0] === 'Stops'">
            <li v-for="stop in item[1]" :key="stop"> {{stop}}</li>
          </ul>
          <span v-else>
            {{item}}
          </span>
        </li>
      </ul>
      <h4 v-if="value[1]">1</h4>
      <ul v-if="value[1]">
        <li v-for="item in Object.entries(value[1])" :key="item">
          {{item}}
          <ul v-if="item[0] === 'Stops'">
            <li v-for="stop in item[1]" :key="stop"> {{stop}}</li>
          </ul>
          <span v-else>
            {{item}}
          </span>
        </li>
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
