import { createRouter, createWebHistory } from 'vue-router'
import Login from '../modules/auth/pages/Login.vue'

const routes = [
  
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Game',
    component: () => import('../modules/memoryGame/pages/Memory.vue')
  },

  { path: '/:pathMatch(.*)*', redirect: { name: 'Game' } }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
const isAuthenticated = localStorage.getItem("user") ? localStorage.getItem("user") : null
router.beforeEach((to, from, next) => {

  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' })
  }
  else next()
})
export default router