<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="../assets/logo.svg" style="width: 200px; height: 200px">
    <div> {{whereAmI}} </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    whereAmI() {
      return this.$router.currentRoute
    },

  },
}
</script>
