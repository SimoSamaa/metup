<template>
  <div class="select-bg flex-1 flex gap-2 justify-between mr-2">
    <button @click="$emit('update:modelValue', false)">
      <ChevronLeft />
    </button>
    <ul class="flex gap-[inherit]">
      <button @click="$emit('set-cancelBgPost', false)">
        <CopySlash />
      </button>
      <li
        v-for="(bgColor, ind) in bgColors"
        :key="ind"
      >
        <button
          @click="selectBgClr(ind, bgColor)"
          :style="{ 'backgroundColor': bgColor }"
          :class="['border-2', currentBgColor === ind ? 'border' : 'border-transparent']"
        ></button>
      </li>
    </ul>
    <button>
      <LayoutGrid />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ChevronLeft, LayoutGrid, CopySlash } from 'lucide-vue-next';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(['set-selectBgClr', 'update:modelValue', 'set-cancelBgPost']);

const bgColors = ref(['#C600FF', '#E2013B', '#111111', '#F35369', '#FF6323', '#165348']);
const currentBgColor = ref<null | number>(null);

const selectBgClr = (ind: number, bgColor: string) => {
  currentBgColor.value = ind;
  emit('set-selectBgClr', bgColor);
};
</script>

<style lang="scss" scoped>
.select-bg {
  button {
    @apply size-[36px] rounded-md grid place-content-center bg-w2;
  }
}
</style>