<template>
  <ul
    v-if="props.images && props.images.length > 0"
    :class="['aspect-[16/11.1] gap-1', imgPreview]"
  >
    <li
      class="relative h-full cursor-pointer"
      v-for="(img, ind) in picLessThan4"
      :key="ind"
      @click="openGallery(img.url)"
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
  <transition name="lightBox-gallery_animation">
    <section
      v-if="toggleGallery"
      @click="toggleGallery = false"
      @keyup.esc="toggleGallery = false"
      tabindex="0"
      ref="imageGallery"
      class="lightBox-imageGallery bg-[#121212] fixed inset-0 z-[1000] grid place-content-center"
    >
      <!-- LIGHTBOX HEADER -->
      <div class="absolute w-full px-4 py-2 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <base-button
            :circleBtn="true"
            class="relative baseHover-group"
          >
            <X />
            <baseHover
              title="Press ESC to close"
              left="60px"
            />
          </base-button>
          <button class="size-10 not-allowed">
            <img
              src="@/assets/logo-2D.png"
              alt="logo"
            >
          </button>
        </div>
        <div class="flex items-center gap-2">
          <base-button :circleBtn="true">
            <ZoomIn />
          </base-button>
          <base-button :circleBtn="true">
            <ZoomOut />
          </base-button>
          <base-button
            :circleBtn="true"
            @click.stop="downloadImg()"
          >
            <Download />
          </base-button>
        </div>
      </div>
      <!-- LIGHTBOX IMAGES -->
      <transition-group
        name="lightbox-images_animation"
        tag="ul"
        appear
        @click.stop
      >
        <li
          v-for="(img, ind) in images"
          :key="ind"
          class="max-w-7xl h-screen"
          v-show="ind === currentImg"
        >
          <img
            :src="img.url"
            class="object-contain w-full"
            alt="image-post-gallery"
          >
        </li>
        <!-- LIGHTBOX ACTIONS -->
        <div
          v-if="props.images.length > 1"
          class="flex absolute left-0 top-1/2 -translate-y-1/2 w-full [&_button]:size-14 [&_button]:shadow-md justify-between px-4"
        >
          <base-button
            :circleBtn="true"
            @click.stop="prevBtn()"
          >
            <ChevronLeft :size="30" />
          </base-button>
          <base-button
            :circleBtn="true"
            @click.stop="nextBtn()"
          >
            <ChevronRight :size="30" />
          </base-button>
        </div>
      </transition-group>
    </section>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue';
import useHelpers from '@/hooks/helpers';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download } from 'lucide-vue-next';

const props = defineProps<{
  images: Array<{ url: string; }>;
}>();

const { useHideScroll } = useHelpers();

const picLessThan4 = ref(props.images.slice(0, 4));
const toggleGallery = ref(false);
const imageGallery = ref<HTMLElement | null>(null);
const currentImg = ref(0);
const currentDownloadImg = ref('');
const currentClickedImg = ref('');

const imgPreview = computed(() =>
  props.images.length === 2 ? 'flex [&_li]:w-1/2'
    : props.images.length === 3 ? 'grid grid-cols-2 grid-rows-2 [&_li:nth-child(3)]:col-span-3'
      : props.images.length >= 4 ? 'grid grid-cols-2 grid-rows-2'
        : ''
);

const images = computed(() => {
  props.images.forEach((img) => {
    if (img.url === currentClickedImg.value) {
      currentImg.value = props.images.indexOf(img);
    }
  });

  return props.images;
});

const openGallery = (img: string) => {
  toggleGallery.value = true;
  currentClickedImg.value = img;
  currentDownloadImg.value = img;
  nextTick(() => {
    (imageGallery.value as HTMLElement).focus();
  });
};

const downloadImg = async () => {
  const fileName = currentDownloadImg.value.slice(currentDownloadImg.value.lastIndexOf('/') + 1);
  const resp = await fetch(currentDownloadImg.value);
  const file = await resp.blob();

  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const prevBtn = () => {
  currentImg.value--;
  currentDownloadImg.value = props.images[currentImg.value].url;
  if (currentImg.value < 0) {
    currentImg.value = props.images.length - 1;
  }

  console.log('prev');
};

const nextBtn = () => {
  currentImg.value++;
  currentDownloadImg.value = props.images[currentImg.value].url;
  if (currentImg.value >= props.images.length) {
    currentImg.value = 0;
  }
  console.log((currentImg.value + 1) + '/' + props.images.length);
  console.log('next');
};

useHideScroll(toggleGallery);
</script>

<style scoped lang="scss">
@import '@/scss/helpers/mixins';

@include setAnimation('lightBox-gallery_animation', null, null, opacity);
@include setAnimation('lightbox-images_animation', (scale: 0, ), (scale: 1), null);
</style>