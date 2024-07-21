<template>
  <div class="select-bg flex-1 flex gap-2 justify-between mr-2">
    <button
      type="button"
      @click="$emit('update:modelValue', false)"
    >
      <ChevronLeft />
    </button>
    <ul class="flex gap-[inherit] max-[500px]:[&_li:nth-last-child(-n+2)]:hidden">
      <button
        type="button"
        @click="$emit('set-cancelBgPost', false)"
      >
        <CopySlash />
      </button>
      <li
        v-for="(bgColor, ind) in bgColorPost"
        :key="ind"
      >
        <button
          @click="selectBgClr(ind, bgColor)"
          :style="{ 'backgroundColor': bgColor }"
          :class="['border-2', currentBgColor === ind ? 'border' : 'border-transparent']"
          type="button"
        ></button>
      </li>
    </ul>
    <button
      type="button"
      @click="$emit('update:openChooseBg', true)"
    >
      <LayoutGrid />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ChevronLeft, LayoutGrid, CopySlash } from 'lucide-vue-next';

const props = defineProps<{
  modelValue: boolean;
  bgPost: string;
}>();

const emit = defineEmits(['set-selectBgClr', 'update:modelValue', 'set-cancelBgPost', 'update:openChooseBg']);

const bgColorPost = ref(['#C600FF', '#E2013B', '#111111', '#F35369', '#FF6323', '#165348']);
const currentBgColor = ref<null | number>(null);

const selectBgClr = (ind: number, bgColor: string) => {
  currentBgColor.value = ind;
  emit('set-selectBgClr', bgColor);

  watch(() => props.bgPost, (newVal, _) => {
    if (!newVal.startsWith('#')) currentBgColor.value = null;
    if (newVal.length === 0) currentBgColor.value = ind;
  });
};
</script>

<style lang="scss" scoped>
.select-bg {
  button {
    @apply size-[36px] rounded-md grid place-content-center bg-w2;
  }
}
</style>