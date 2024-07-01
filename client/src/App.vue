<template>
  <NavigationBar v-if="allowComponents" />
  <RouterView />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import useAuthStore from '@/modules/auth/index';
import NavigationBar from '@/components/layouts/NavigationBar.vue';

const route = useRoute();
const allowComponents = computed(() =>
  route.name === 'home' ||
  route.name === 'watch' ||
  route.name === 'friends' ||
  route.name === 'activate'
);
</script>