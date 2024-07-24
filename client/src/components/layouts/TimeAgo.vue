<template>
  <div class="text-xs">{{ relativeTime }}</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import moment from 'moment';

const props = defineProps(['date']);

const now = ref(Date.now());

const relativeTime = computed(() => {
  now.value;

  const timeAgo = moment(props.date).fromNow().split(' ago')[0];

  switch (timeAgo) {
    case 'a few seconds':
      return 'just now';
    case 'a minute':
      return '1 minute';
    default:
      return timeAgo;
  }
});

let intervalId;
onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now();
  }, 60000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
