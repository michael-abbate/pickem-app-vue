import { createRouter, createWebHistory } from 'pickem-frontend/node_modules/vue-router'
import ShowPicks from '../views/ShowPicks.vue'
import SelectedPicks from '../views/SelectedPicks.vue'

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // '/' denotes it will be the homepage
  {
    path: '/',
    redirect: {
      name: 'ShowPicks'
    }
  },
  {
    path: '/showpicks',
    name: 'ShowPicks',
    component: ShowPicks,
    props: true
  },
  {
    path: '/selected',
    name: 'SelectedPicks',
    component: SelectedPicks,
    props: true
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
