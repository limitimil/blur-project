<template>
    <q-drawer
      v-model="drawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Our Works</q-item-label>
        <q-item clickable tag="a" href="/week1">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Week1</q-item-label>
            <q-item-label caption>week1</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" href="/week2">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Week2</q-item-label>
            <q-item-label caption>week2</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" href="/week3">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Week3</q-item-label>
            <q-item-label caption>week3</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" :href="item" :key="item" v-for="item in usefulLinks">
          <q-item-section avatar>
            <q-icon name="favorite_border" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{item}}</q-item-label>
            <q-item-label caption>{{item}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
</template>

<style>
</style>

<script>
export default {
  name: 'Drawer',
  props: {
    value: Boolean,
  },
  data() {
    return {
      usefulLinks: [
        '/component-stories/GoogleMap',
        '/data-stories/topFiveBikeStationNearBy101',
        '/data-stories/topFiveBikeStationNearBy101WithKeyword',
        '/vuex-stories/Travel',
        '/week2/workflow/bike-station',
        '/vuex-stories/BusStopMap',
      ],
    }
  },
  computed: {
    whereAmI() {
      return this.$router.currentRoute
    },

  },
}
</script>
