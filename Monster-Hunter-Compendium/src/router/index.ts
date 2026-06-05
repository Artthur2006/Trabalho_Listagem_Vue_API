import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MonstersListView from '@/views/MonstersListView.vue'
import MonsterDetailsView from '@/views/MonsterDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/monsters',
      name: 'list',
      component: MonstersListView,
    },
    {
      path: '/monster/:id',
      name: 'monster-details',
      component: MonsterDetailsView,
    },
  ],
})

export default router
