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
import { useQuasar } from 'quasar'
import lodash from 'lodash'

const COLLECTION_KEY = 'collection'
const getCollectionToList = (value: string | null): string[] => {
  console.log(value)
  if (!value) return []
  return JSON.parse(value)
}

export default {
  name: 'LayoutDefault',

  props: [
    'value',
  ],

  components: {
  },

  setup(props: any) {
    const $q = useQuasar()
    const collection = getCollectionToList($q.localStorage.getItem(COLLECTION_KEY))
    const isSaved = ref(collection.includes(props.value.ID))
    const handleUpdate = (checkBoxValue: boolean) => {
      const currentCollection = getCollectionToList($q.localStorage.getItem(COLLECTION_KEY))
      if (checkBoxValue) {
        currentCollection.push(props.value.ID)
        $q.localStorage.set(COLLECTION_KEY, JSON.stringify(currentCollection))
      } else {
        $q.localStorage.set(
          COLLECTION_KEY,
          JSON.stringify(lodash.remove(currentCollection, props.value.ID)),
        )
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


