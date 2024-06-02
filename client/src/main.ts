import '@/scss/main.scss';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from '@/App.vue';

const app = createApp(App, { appName: 'METUP' });

const store = createPinia();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
});

app
  .use(store)
  .use(router);

app.mount('#app');