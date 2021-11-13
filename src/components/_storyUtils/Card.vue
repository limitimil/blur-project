<template>
  <q-card>
    <q-card-section>
      <q-checkbox v-model="isSaved" @update:model-value="handleUpdate"></q-checkbox>
      {{ value }}
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
