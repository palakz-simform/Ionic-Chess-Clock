import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import ClockPage from '../views/ChessClock.vue'

const routes: Array<RouteRecordRaw> = [
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
    component: () => import("../views/ChessClock.vue")
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
