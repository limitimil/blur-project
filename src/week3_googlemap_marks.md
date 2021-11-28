# Bug report
- 40 location icon is not enough for rendering bus stops, for example: 204 in Taipei
# Extra Task
- reorder the relationship between the following module
  - components/vuexStories/stories/BusStopMap.vue
  - @/components/_week2Utils/gMap.vue
  - @/components/_week2Utils/store
  - @/store/bus
- deprecate BusStop definition from components/_week3Utils/interface/BusStop.ts
- figure out the relationship between RouteID and SubRouteID.
- figure out how to avoid StopOfRoute return multiple result
- refactore gmap component/ gmap store
  - include google script in demend
# Knowledge
- When we query route by routeName, we might get 2 stop schedule in the same direction. Because there might be multiple sub-route share the same routeName, we need to handle this situation either on the UX or inside the data fetch process.
# Dynamic
- upgrade data fetch to include ID===ID in the query :postpone:
    - extendx tdxrequestbuilder
        - pro
          - reuse with filter registration pattern
          - potentially clean code
        - con
          - need refactoring
          - type check for required fields will be disabled
    - regist with filter
    - adjust invoker process
- suggest data-fetch user to assign routeID instead of routeName to fetch stops information :postpone:
- revamp vuex Story to use bus store and make bus store module gMap store :ok:
    - vuex Story use bus store :ok:
    - bus store module gMap store
        - consider elevating gmap component or gmap store
- service to get icon :ok:
# Plan
- mark bus station with order :ok:
- embed position data in the response of bus :ok:
- install gmap store inside bus store :ok:
- Merge PR
- future work
  - deal with subroute issue in aspect of UI/UX, data-fetch, frontend components
