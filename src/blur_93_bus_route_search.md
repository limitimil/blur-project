# Extra Task
- unittest gMap.vue
    - with some hack
    - decouple googlemap modules
- refactor @/data-fetch/bus.ts :ok:
    - remove deprecated interfaces :ok:
    - extends TdxRequestBuilder
      - breaking change invoke usage
- insert new fields to base class
  - abstract method withNearBy
# Dynamic Task
- feed right city information to BusStopService, city information should be infered by lnglat. :ok:
  - candidates are:
    - npm i taiwan-area-from-lnglat :selected:
    - GoogleMap Api https://developers.google.com/maps/documentation/geocoding/overview
    - combine multiple queries and combine the data
- draw a workflow with draw.io
- draw marks on googlemap, mimic the mark function in @/store/bus.ts
  - candidates are:
    - create new store @/store/busStop.ts responsible for rendering busstops
      - drawing on google map
      - render option in search bar
    - extract the action into gMap Service
    - extract the action into ** Service
    - make this method a submodule
    - make this method a util function
- hacky way to test emit
- integrate new component with google map week3
    - I have several choices
      - piggyback gMap.vue
      - extract base component
      - copy gMap.vue
      - extend gMap.vue
- create a component in which render two elements
  - tooltip
      - base on q-popup-proxy
      - trigger event by hover
  - cta for center by my location
- data-story for :ok:
  - busStopNearBy101,
  - topFiveBusStopInTaipei,
# Plan
- 4. 定位目前位置，以目前GPS 標示出站牌
    - search bus stop by location information
        - service/busStop.ts :ok:
        - combine user experience
            - add element for getting gps on googlemap :ok:
            - bind action with the element :ok:
            - many dynamic issues related to tech debt and duplicate codes
- 3. 熱門站牌
- 1. 請輸入路線編號，或直接點選左側路線編號。
- 2. 請輸入關鍵字（如站牌、地址）