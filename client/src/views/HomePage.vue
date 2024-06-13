<template>
  <h1 ref="mess"></h1>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const mess = ref<null | HTMLElement>(null);


onMounted(() => {
  (mess.value as HTMLElement).innerHTML = 'Hello World';
});
</script>