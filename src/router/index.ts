import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/daftar-piutang-unit',
      name: 'dpu-page',
      component: () => import('../views/DaftarPiutangUnit.vue'),
    },
  ],
})

export default router
