import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MonsterDetailsView from '../views/MonsterDetailsView.vue'
import SeachView from '../views/SeachView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/monster/:id',
    name: 'details',
    component: MonsterDetailsView
  },
  {
    path: '/search',
    name: 'search',
    component: SeachView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router