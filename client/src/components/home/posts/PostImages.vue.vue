<template>
  <ul
    v-if="props.images && props.images.length > 0"
    :class="['aspect-[16/11.1] gap-1', imgPreview]"
  >
    <li
      class="relative h-full cursor-pointer"
      v-for="(img, ind) in picLessThan4"
      :key="ind"
      @click="openGallery()"
    >
      <img
        :src="img.url"
        class="object-cover w-full"
        alt="image-post"
      >
      <h2
        v-if="ind === picLessThan4.length - 1 && props.images.length > 4"
        class="absolute text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >+{{ props.images.length - 4 }}</h2>
    </li>
  </ul>
  <!-- LIGHTBOX GALLERY -->
  <transition name="lightBox-gallery">
    <section
      v-if="toggleGallery"
      @click="toggleGallery = false"
      @keyup.esc="toggleGallery = false"
      tabindex="0"
      ref="imageGallery"
      class="lightBox-imageGallery bg-[#121212] fixed inset-0 z-[1000]"
    ></section>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue';
import useHelpers from '@/hooks/helpers';

const props = defineProps<{
  images: Array<{ url: string; }>;
}>();

const { useHideScroll } = useHelpers();

const picLessThan4 = ref(props.images.slice(0, 4));
const toggleGallery = ref(false);
const imageGallery = ref<HTMLElement | null>(null);

const imgPreview = computed(() =>
  props.images.length === 2 ? 'flex [&_li]:w-1/2'
    : props.images.length === 3 ? 'grid grid-cols-2 grid-rows-2 [&_li:nth-child(3)]:col-span-3'
      : props.images.length >= 4 ? 'grid grid-cols-2 grid-rows-2'
        : ''
);

const openGallery = () => {
  toggleGallery.value = true;
  nextTick(() => {
    (imageGallery.value as HTMLElement).focus();
  });
};

useHideScroll(toggleGallery);
</script>

<style scoped lang="scss">
@import '@/scss/helpers/mixins';

@include setAnimation('lightBox-gallery', null, null, opacity);
</style>