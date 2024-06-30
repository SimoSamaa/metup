<template>
  <base-alert
    :show="isError"
    type="alert-error"
    :message="errMess"
  ></base-alert>
  <NavigationBar v-if="allowComponents" />
  <RouterView />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import useAuthStore from '@/modules/auth/index';
import useUserStore from '@/modules/user/index';
import NavigationBar from '@/components/layouts/NavigationBar.vue';

const route = useRoute();
const authStore = useAuthStore();
const userStore = useUserStore();

const allowComponents = computed(() =>
  route.name === 'home' || route.name === 'watch' || route.name === 'friends'
);

const errMess = ref('');
const isAuth = computed(() => authStore.isAuth);
const isError = computed(() => isAuth.value === true && !!errMess.value);

const loadUserDta = async () => {
  try {
    await userStore.fetchUser();
  } catch (err) {
    console.error(err);
    errMess.value = (err as Error).message;
    setInterval(() => errMess.value = '', 5000);
  }
};

loadUserDta();
authStore.tryLogin();
</script>