import { createRouter, createWebHistory } from '@ionic/vue-router';
import ClockPage from '../views/ChessClock.vue'

const routes = [
  {
    path: '/',
    redirect: '/chessClock'
  },
  {
    path: '/chessClock',
    name: 'ChessClock',
    component: ClockPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/chessClock'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
