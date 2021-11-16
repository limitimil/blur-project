<template>
  <div class="card-container">
    <div class="map" id="map"></div>
    <q-btn @click="toMyLocation">my location</q-btn>
  </div>
</template>

<script lang="js">
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 25.03357704438537, lng: 121.56165724984085 },
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControl: true,
    streetViewControl: false
  });

  return map;
}
function handleLocationError(
    browserHasGeolocation,
    infoWindow,
    pos
) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

import { ref, onMounted, defineComponent } from 'vue'
import store from './store/gMap'

export default defineComponent({
  name: 'LayoutDefault',

  components: {
  },

  setup() {
    let map
    onMounted(()=>{
      store.dispatch('initMap', 'map')
    })
    return {
      toMyLocation: ()=> store.disaptch('centerByMyLocation'),
    }
  },
})


</script>
<style scoped lang="less">
body {
  margin: 0;
}

.sb-title {
  position: relative;
  top: -12px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
}

.sb-title-icon {
  position: relative;
  top: -5px;
}

.card-container {
  display: flex;
  height: 500px;
  width: 600px;
}

.panel {
  background: white;
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.half-input-container {
  display: flex;
  justify-content: space-between;
}

.half-input {
  max-width: 120px;
}

.map {
  width: 100%;
}

h2 {
  margin: 0;
  font-family: Roboto, sans-serif;
}

input {
  height: 30px;
}

input {
  border: 0;
  border-bottom: 1px solid black;
  font-size: 14px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
}

input:focus::placeholder {
  color: white;
}

.button-cta {
  height: 40px;
  width: 40%;
  background: #3367d6;
  color: white;
  font-size: 15px;
  text-transform: uppercase;
  font-family: Roboto, sans-serif;
  border: 0;
  border-radius: 3px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.48);
  cursor: pointer;
}
</style>
