import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthPage.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('@/views/FriendsPage.vue')
    },
    {
      path: '/watch',
      name: 'watch',
      component: () => import('@/views/WatchPage.vue')
    }
  ]
});

export default router;