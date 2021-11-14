<template>
  <q-card class="card">
    <img :src="value?.Picture?.PictureUrl1" alt="">
    <q-card-section>
      <div class="row justify-between">
        <div class="card-header">#{{value?.City}}</div>
        <div class="collect-btn">
          <q-checkbox v-model="isSaved" @update:model-value="handleUpdate" size="xs"/>
        </div>
      </div>
      <div class="row card-tags">
        <BadgeGroup :value="value"/>
      </div>
      <div class="row card-title">{{value?.Name}}</div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import BadgeGroup from './BadgeGroup.vue'

export default {
  name: 'Card',

  props: [
    'value',
  ],

  components: {
    BadgeGroup,
  },

  setup(props: any) {
    const store = useStore()

    const isSaved = ref(store.getters.savedIds.includes(props.value.ID))
    const handleUpdate = (checkBoxValue: boolean) => {
      const id = props.value.ID
      if (checkBoxValue) {
        store.dispatch('save', id)
      } else {
        store.dispatch('unSave', id)
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
.card-title {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.05em;

  color: #000000;
}
</styile>
