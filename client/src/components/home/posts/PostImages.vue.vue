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
      @click="toggleGallery = false; imgScale = 0"
      @keyup.esc="toggleGallery = false, imgScale = 0"
      tabindex="0"
      ref="imageGallery"
      class="lightBox-imageGallery bg-[#121212] fixed inset-0 z-[1000] grid place-content-center"
    >
      <!-- LIGHTBOX HEADER -->
      <div class="absolute w-full px-4 py-2 flex items-center justify-between z-10">
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
          <div class="bg-w2 px-3 py-1 shadow-md  rounded-md font-semibold">
            {{ (currentImg + 1) + '/' + props.images.length }}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <base-button
            :circleBtn="true"
            @click.stop="zoomInImg()"
            :disabled="imgScale >= 5"
          >
            <ZoomIn />
          </base-button>
          <base-button
            :circleBtn="true"
            @click.stop="zoomOutImg()"
            :disabled="imgScale === 0"
          >
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
          v-show="ind === currentImg"
          class="lightBox-img bg-rd-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full w-[700px] transition-transform duration-300 ease-in-out"
          ref="lightboxImages"
          @mousedown.prevent="imgMouseDown($event)"
          @mousemove="imgMouseMove($event)"
          @mouseup="imgMouseUp($event)"
          @mouseleave="isDragging = false"
        >
          <img
            :src="img.url"
            class="object-contain w-full h-full select-none"
            alt="image-post-gallery"
          >
        </li>
      </transition-group>
      <!-- LIGHTBOX ACTIONS -->
      <div
        @click="toggleGallery = false"
        v-if="props.images.length > 1"
        class="flex pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-full [&_button]:size-14 [&_button]:shadow-md justify-between px-4"
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
const currentImg = ref(0), currentDownloadImg = ref(''), currentClickedImg = ref('');
const lightboxImages = ref<NodeList | null>(null);
const imgScale = ref(0), isDragging = ref(false);
const startX = ref(0), startY = ref(0), initialLeft = ref(0), initialTop = ref(0);

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

const zoomInImg = () => {
  imgScale.value++;
  if (imgScale.value > 4) imgScale.value = 5;

  (lightboxImages.value as NodeListOf<HTMLElement>)
    .forEach((imgEle) => {
      imgEle.style.cursor = 'grab';
      imgEle.style.transform = `translate(-50%, -50%) scale(${1 + imgScale.value * 0.3})`;
    });
};

const zoomOutImg = () => {
  imgScale.value--;

  (lightboxImages.value as NodeListOf<HTMLElement>)
    .forEach((imgEle) => {
      if (imgScale.value <= 0) {
        imgScale.value = 0;
        imgEle.style.cursor = 'auto';
      }

      imgEle.style.transform = `translate(-50%, -50%) scale(${1 + imgScale.value * 0.3})`;

      if (imgScale.value === 0) {
        imgEle.style.left = '50%';
        imgEle.style.top = '50%';
      }
    });
};

const imgMouseDown = (e: MouseEvent) => {
  if (!(e.currentTarget instanceof HTMLElement)) return;
  if ((imgScale.value === 0)) return;
  isDragging.value = true;
  startX.value = e.clientX;
  startY.value = e.clientY;
  initialLeft.value = e.currentTarget.offsetLeft;
  initialTop.value = e.currentTarget.offsetTop;
  e.currentTarget.style.cursor = 'grabbing';
};

const imgMouseUp = (e: MouseEvent) => {
  if (!(e.currentTarget instanceof HTMLElement)) return;
  isDragging.value = false;
  e.currentTarget.style.cursor = imgScale.value >= 1 ? 'grab' : 'auto';
};

const imgMouseMove = (e: MouseEvent) => {
  if (!(e.currentTarget instanceof HTMLElement)) return;
  if (!isDragging.value) return;
  isDragging.value = true;
  const dx = e.clientX - startX.value;
  const dy = e.clientY - startY.value;

  const newLeft = initialLeft.value + dx;
  const newTop = initialTop.value + dy;

  e.currentTarget.style.left = `${newLeft}px`;
  e.currentTarget.style.top = `${newTop}px`;
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
  imgScale.value = 0;
  if (currentImg.value < 0) {
    currentImg.value = props.images.length - 1;
    currentDownloadImg.value = props.images[currentImg.value].url;
  }
};

const nextBtn = () => {
  currentImg.value++;
  imgScale.value = 0;
  if (currentImg.value >= props.images.length) {
    currentImg.value = 0;
    currentDownloadImg.value = props.images[currentImg.value].url;
  }
};

useHideScroll(toggleGallery);
</script>

<style scoped lang="scss">
@import '@/scss/helpers/mixins';

@media (max-device-width: 950px) and (orientation: landscape) {
  .lightBox-img {
    @apply h-screen;
  }
}

@include setAnimation('lightBox-gallery_animation', null, null, opacity);
@include setAnimation('lightbox-images_animation',
  (transform: translate(-50%, -50%) scale(0)),
  (transform: translate(-50%, -50%) scale(1)),
  null);
</style>