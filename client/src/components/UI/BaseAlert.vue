<template>
  <Teleport to="body">
    <transition name="test">
      <div
        v-if="show"
        role="alert"
        :class="['alert flex w-[calc(100%-1rem)] fixed left-1/2 -translate-x-1/2 top-20 max-[950px]:top-36 z-20 max-w-md shadow-md text-w1 text-left', type, custom]"
      >
        <Info v-if="type === 'alert-info'" />
        <TriangleAlert v-if="type === 'alert-warning'" />
        <CircleX v-if="type === 'alert-error'" />
        <BadgeCheck v-if="type === 'alert-success'" />
        <span>{{ message }}</span>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { Info, TriangleAlert, CircleX, BadgeCheck } from 'lucide-vue-next';

const props = defineProps<{
  show: boolean;
  message: string;
  type: string;
  custom: string;
}>();

setTimeout(() => {
  !props.show;
}, 5000);
</script>

<style scoped lang="scss">
@import '@/scss/helpers/mixins';

@include setAnimation('test',
  (transform: translate(-50%, -70px) scale(0.8)),
  (transform: translateY(-50%, 0) scale(1)),
  null);
</style>