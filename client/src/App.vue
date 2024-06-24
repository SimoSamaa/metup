<template>
  <NavigationBar v-if="allowNavigationBar" />
  <routerView />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavigationBar from '@/components/layouts/NavigationBar.vue';
const route = useRoute();

const allowNavigationBar = computed(() =>
  route.name === 'home' || route.name === 'watch' || route.name === 'friends'
);
</script>