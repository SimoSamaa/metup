import { createRouter, createWebHistory } from 'vue-router';
import useAuthStore from './modules/auth/index';

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
      meta: { requiresUnAuth: true },
      component: () => import('@/views/AuthPage.vue')
    },
    {
      path: '/home',
      name: 'home',
      meta: { requiresAuth: true },
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/friends',
      name: 'friends',
      meta: { requiresAuth: true },
      component: () => import('@/views/FriendsPage.vue')
    },
    {
      path: '/watch',
      name: 'watch',
      meta: { requiresAuth: true },
      component: () => import('@/views/WatchPage.vue')
    },
    // {
    //   path: '/:notFound(.*)',
    //   component: null
    // }
  ]
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  const isAuth = authStore.isAuth;

  console.log('ss', authStore.userId);
  console.log('ss', authStore.token);
  console.log('ss', authStore.getUser);



  if (to.meta.requiresAuth && !isAuth) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && isAuth) {
    next('/home');
  }

  next();
});

export default router;