<template>
  <main
    v-if="props.openChooseBg"
    class="absolute bg-w1 inset-0 rounded-md grid"
  >
    <div class="p-4 flex justify-between items-center border-b border-third">
      <base-button
        :circleBtn="true"
        @click="$emit('update:openChooseBg', false)"
      >
        <ArrowLeft />
      </base-button>
      <p class="text-xl font-semibold text-black flex-1 text-center">Choose Background</p>
    </div>
    <div class="flex-1 overflow-y-auto">
      <!-- POPULAR -->
      <div class="p-4">
        <p class="font-semibold mb-4 text-lg">Popular</p>
        <div class="flex flex-wrap gap-2 justify-evenly">
          <button
            v-for="(bg, ind) in bgImagePost"
            v-show="bg.type === 'popular'"
            :key="ind"
            class="not-allowed size-[80px] rounded-lg overflow-hidden"
            @click="selectBgImagePost(bg.bgPost)"
          >
            <img :src="usePath(bg.bgChoose)">
          </button>
        </div>
      </div>
      <!-- MORE -->
      <div class="p-4">
        <p class="font-semibold mb-4 text-lg">More</p>
        <div class="flex flex-wrap gap-2 justify-evenly">
          <button
            v-for="(bg, ind) in bgImagePost"
            v-show="bg.type === 'more'"
            :key="ind"
            class="not-allowed size-[80px] rounded-lg overflow-hidden"
            @click="selectBgImagePost(bg.bgPost)"
          >
            <img :src="usePath(bg.bgChoose)">
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import useHelpers from '@/hooks/helpers';
import bgImagePost from './bgImagePost';
import { ArrowLeft } from 'lucide-vue-next';

const { usePath } = useHelpers();

const props = defineProps<{ openChooseBg: boolean; }>();
const emit = defineEmits(['update:openChooseBg', 'set-selectBgImagePost']);

const selectBgImagePost = (bgImg: string) => {
  emit('set-selectBgImagePost', bgImg);
  emit('update:openChooseBg', false);
};
</script>