import { createRouter, createWebHistory } from 'vue-router'
import bookshelfRouter from './part_routers/bookshelfRouter'
import { useUserStore } from '@/stores/users'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'dashboard' },
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'blank',
        requiresAuth: false,
        breadcrumb: [{ name: 'Авторизация' }],
      },
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        layout: 'blank',
        requiresAuth: false,
        breadcrumb: [{ name: 'Регистрация' }],
      },
      component: () => import('@/views/Register.vue'),
    },

    // Страницы вэб сервиса
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        layout: 'content',
        requiresAuth: true,
        breadcrumb: [{ name: 'Главная' }],
      },
      component: () => import('@/views/dashboard/DashboardPage.vue'),
    },

    ...bookshelfRouter,

    // Страницы ошибок
    {
      path: '/404',
      name: 'page404',
      meta: {
        layout: 'blank',
        requiresAuth: false,
        breadcrumb: [{ name: 'Страница 404' }],
      },
      component: () => import('@/components/HTTP404NOTFOUND.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (userStore.getIsLoggedIn) {
      next()
      return
    }
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
