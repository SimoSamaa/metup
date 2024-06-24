import '@/scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from './router';

const app = createApp(App);

const store = createPinia();

import BaseAlert from '@/components/UI/BaseAlert.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseHover from '@/components/UI/BaseHover.vue';

app.component('base-alert', BaseAlert);
app.component('base-button', BaseButton);
app.component('BaseHover', BaseHover);

app
  .use(store)
  .use(router);

app.mount('#app');