import { createRouter, createWebHistory } from 'vue-router'
import ShowPicks from '../views/ShowPicks.vue'
import SelectedPicks from '../views/SelectedPicks.vue'
import NFLTeams from '../components/NFLTeams.vue'
import RegisterUser from '@/components/RegisterUser.vue'
import LoginUser from '@/components/LoginUser.vue'
import UserLeaderboard from '@/components/UserLeaderboard.vue'
import GroupPicks from '@/components/GroupPicks.vue'


const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'RegisterUser',
    component: RegisterUser
    
  },
  {
    path: '/login',
    name: 'LoginUser',
    component: LoginUser
    
  },
  {
    path: '/leaderboard',
    name: 'UserLeaderboard',
    component: UserLeaderboard
    
  }
  ,
  {
    path: '/group/picks',
    name: 'GroupPicks',
    component: GroupPicks
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
  },
  {
    path: '/nflteams',
    name: 'NFLTeams',
    component: NFLTeams,
    props: true
  }
  
]

const router = createRouter({
  mode:"history",
  history: createWebHistory(process.env.BASE_URL),
  routes
})
console.log("Router:");
console.log(process.env.BASE_URL);
export default router
