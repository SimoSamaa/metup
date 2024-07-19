<template>
  <Teleport to="body">
    <transition name="test">
      <div
        v-if="show"
        role="alert"
        :class="['alert flex w-[calc(100%-1rem)] fixed left-1/2 -translate-x-1/2 top-20 max-[950px]:top-32 z-[9999] max-w-md shadow-md text-w1 text-left overflow-hidden', type, custom]"
      >
        <Info v-if="type === 'alert-info'" />
        <TriangleAlert v-if="type === 'alert-warning'" />
        <CircleX v-if="type === 'alert-error'" />
        <BadgeCheck v-if="type === 'alert-success'" />
        <span>{{ message }}</span>
        <span
          class="absolute left-0 bottom-0 h-1 rounded-md bg-white"
          :style="{ width: `${progress}%` }"
        ></span>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, watch, onUnmounted } from 'vue';
import { Info, TriangleAlert, CircleX, BadgeCheck } from 'lucide-vue-next';

const props = defineProps<{
  show: boolean;
  message: string;
  type: string;
  custom?: string;
}>();

const progress = ref(0);
const targetValue = 100;
const duration = 5000;
const intervalTime = duration / targetValue;

let intervalId: number | null = null;

const startProgress = () => {
  intervalId = setInterval(() => {
    progress.value++;
    if (progress.value === targetValue) {
      clearInterval(intervalId as number);
      intervalId = null;
    }
  }, intervalTime);
};

watch(
  () => props.show,
  (newShow) => {
    if (newShow) {
      progress.value = 0;
      startProgress();
    } else if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
);

onUnmounted(() => {
  if (intervalId !== null) clearInterval(intervalId);
});
</script>

<style scoped lang="scss">
@import '@/scss/helpers/mixins';

@include setAnimation('test',
  (transform: translate(-50%, -70px) scale(0.8)),
  (transform: translateY(-50%, 0) scale(1)),
  null);
</style>