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
  name: 'LayoutDefault',

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
<style scoped lang="less">
.hack1{
 background-color: hsla(208, 26%, 75%, 1);
}
.hack2{
 background-color: hsla(17, 25%, 33%, 1);
}
.hack3{
 background-color: hsla(203, 16%, 96%, 1);
}
.hack4{
 background-color: hsla(214, 15%, 62%, 1);
}
.hack5{
 background-color: hsla(240, 7%, 47%, 1);
}
</style>
