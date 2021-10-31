<template>
  <div class="q-pa-md">
    <div class="row">
      <h6 class="col-12">Create an announcement</h6>
    </div>
    <div class="row">
      <span class="col-3">Title:</span>
      <q-input class="col-9" v-model="title"></q-input>
      <span class="col-3">Content:</span>
      <q-editor class="col-9" v-model="content"></q-editor>
    </div>
    <div class="row">
      <q-btn :loading="loading" @click="submit">submit</q-btn>
    </div>
  </div>
</template>
<script lang="ts">

export default {
  name: 'Editor',
  data() {
    return {
      title: 'empty title',
      content: 'empty article',
      loading: false,
    }
  },
  methods: {
    submit() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const vm: any = this
      vm.loading = true
      setTimeout(() => {
        vm.loading = false
        // eslint-disable-next-line no-alert
        alert('your announcement cannot be sent, please find your admin')
      }, 1000 * 3)
    },
  },
}
</script>
<style scoped lang="less">
.row:not(:first-child) {
  padding-bottom: 8px;
}
</style>
