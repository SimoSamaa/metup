<template>
  <Teleport to="body">
    <transition name="test">
      <div
        v-if="show"
        role="alert"
        :class="['alert fixed left-1/2 -translate-x-1/2 top-4 z-20 max-w-md shadow-md text-w1', type]"
      >
        <Info v-if="type === 'alert-info'" />
        <TriangleAlert v-if="type === 'alert-warning'" />
        <CircleX v-if="type === 'alert-error'" />
        <BadgeCheck v-if="type === 'alert-success'" />
        <span>{{ message }}l</span>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { Info, TriangleAlert, CircleX, BadgeCheck } from 'lucide-vue-next';

defineProps<{
  show: boolean;
  message: string;
  type: string;
}>();
</script>

<style scoped lang="scss">
@import '@/scss/helpers/mixins';

@include setAnimation('test',
  (transform: translate(-50%, -70px) scale(0.8)),
  (transform: translateY(-50%, 0) scale(1)),
  null);
</style>