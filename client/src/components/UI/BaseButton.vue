<template>
  <button
    v-if="!circleBtn"
    :disabled="!loading ? false : true"
    :class="['not-allowed h-[48px] text-w1 rounded-md w-full duration-300 ease-out transition-colors font-semibold grid items-center justify-center gap-1 active:scale-95', color]"
  >
    <p v-if="!loading">
      <slot></slot>
    </p>
    <span
      v-else
      class="loading loading-bars loading-md"
    ></span>
  </button>
  <button
    v-else
    :disabled
    class="bg-w2 relative size-[36px] rounded-full grid place-content-center active:scale-95"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  loading?: boolean;
  color?: string;
  circleBtn?: boolean;
  disabled?: boolean;
}>();
</script>

<style scoped lang="scss">
.bg-blue2 {
  @apply hover:bg-blue-700 focus-visible:bg-blue-700;
}

.bg-green-500 {
  @apply hover:bg-green-700 focus-visible:bg-green-700;
}
</style>