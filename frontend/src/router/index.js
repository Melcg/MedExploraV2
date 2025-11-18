// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/region/:regionId',
    name: 'RegionDetail',
    component: () => import('@/views/RegionDetailView.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/technique/:regionId/:systemId/:techniqueId',
    name: 'Technique',
    component: () => import('@/views/TechniqueView.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/multimedia/:type/:id',
    name: 'MultimediaPlayer',
    component: () => import('@/views/MultimediaPlayerView.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/checklist/:techniqueId',
    name: 'Checklist',
    component: () => import('@/views/ChecklistView.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/cases',
    name: 'ClinicalCases',
    component: () => import('@/views/ClinicalCasesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/case/:caseId',
    name: 'CaseDetail',
    component: () => import('@/views/CaseDetailView.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/SearchView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/review',
    name: 'QuickReview',
    component: () => import('@/views/QuickReviewView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/bibliography',
    name: 'Bibliography',
    component: () => import('@/views/BibliographyView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Guard de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && authStore.isAuthenticated) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router