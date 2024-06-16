import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthPage.vue')
    }
  ]
});

export default router;