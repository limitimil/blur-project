<template>
  <q-page class="flex flex-center">
    <img
      alt="BLUR logo"
      src="../assets/01_BLUR_logo00_800x800.svg"
      style="width: 200px; height: 200px"
    />
    <div>{{ whereAmI }}</div>
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
