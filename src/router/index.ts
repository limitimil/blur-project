import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

require('@/components/vuexStories/StoryRoot.vue')
require('@/components/componentStories/StoryRoot.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/week1',
    name: 'Week1',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Travel.vue'),
  },
  {
    path: '/week2',
    name: 'Week2',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Bike.vue'),
  },
  {
    path: '/week2/workflow',
    name: 'SmileBikeWorkflow',
    component: () => import(/* webpackChunkName: "week2-workflow" */ '@/views/SmileBikeWorkflow.vue'),
    children: [
      {
        path: 'bike-station',
        name: 'BikeStation',
        component: () => import(/* webpackChunkName: "week2-workflow" */ '@/views/BikeStation.vue'),
      },
    ],
  },
  {
    path: '/week3',
    name: 'Week3',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Bus.vue'),
  },
  {
    path: '/data-stories/:storyId',
    name: 'DataStories',
    component: () => import(/* webpackChunkName: "about" */ '../components/dataStories/StoryRoot.vue'),
  },
  {
    path: '/vuex-stories/:storyId',
    name: 'VuexStories',
    component: () => import(/* webpackChunkName: "about" */ '../components/vuexStories/StoryRoot.vue'),
  },
  {
    path: '/component-stories/:storyId',
    name: 'ComponentStories',
    component: () => import(/* webpackChunkName: "about" */ '../components/componentStories/StoryRoot.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
