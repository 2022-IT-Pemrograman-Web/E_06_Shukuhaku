import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/kamar',
      name: 'kamar',
      component: () => import('../views/KamarView.vue')
    },
    {
      path: '/kamar/:id',
      name: 'kamar-detail',
      component: () => import('../views/KamarDetailView.vue')
    },
    {
      path: '/kamar/:id/edit',
      name: 'kamar-edit',
      component: () => import('../views/KamarEditView.vue')
    },
    {
      path: '/kamar/:id/delete',
      name: 'kamar-delete',      
    },
    {
      path: '/kamar/create',
      name: 'kamar-create',
      component: () => import('../views/KamarCreateView.vue')
    },
    {
      path: '/pemesanan',
      name: 'pemesanan',
      component: () => import('../views/PemesananView.vue')
    },
    {
      path: '/pemesanan/history',
      name: 'pemesanan-history',
      component: () => import('../views/PemesananHistoryView.vue')
    }
  ]
})

export default router
