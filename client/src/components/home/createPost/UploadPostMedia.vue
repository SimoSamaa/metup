<template>
  <div class="p-2 border border-third rounded-md h-[300px]">
    <ul
      v-if="images && images.length > 0"
      @dragover.prevent="isDrag = true"
      @dragleave="isDrag = false"
      @drop.prevent="handleDrop($event)"
      :class="['upload-area relative group gap-1 overflow-auto rounded-md h-full [&_li_img]:h-[282px] duration-300 transition-transform', { 'scale-95': isDrag }, imgPreview]"
    >
      <base-button
        :circleBtn="true"
        class="!absolute right-4 top-4 size-[28px]"
        @click="resetUploadArea()"
      >
        <X :size="20" />
      </base-button>
      <div class="absolute left-4 top-4 flex gap-2 opacity-0 duration-300 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          class="upload-actions hover-w2"
        >
          <Pencil :size='19' />
          <p class="max-[650px]:hidden">Edit All</p>
        </button>
        <button
          @click="browserFile($event)"
          class="add-more upload-actions hover-w2"
          type="button"
        >
          <CopyPlus :size='19' />
          <p class="max-[650px]:hidden">Add Photos/Video</p>
        </button>
      </div>
      <li
        v-for="(img, ind) in images"
        :key="ind"
        class="relative -z-10"
      >
        <img
          :src="img"
          alt="image upload"
          class="object-cover w-full"
        >
        <h2
          v-if="images.length >= 4 && imgGreaterThan4.length >= 5 && ind === images.length - 1"
          class="absolute text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >+{{ imgGreaterThan4.length - 4 }}</h2>
      </li>
    </ul>
    <div
      v-else
      @click="browserFile($event)"
      @dragover.prevent="isDrag = true"
      @dragleave="isDrag = false"
      @drop.prevent="handleDrop($event)"
      :class="['h-full bg-w2 rounded-md cursor-pointer hover:bg-third grid place-content-center relative group [&>*:not(:first-child)]:pointer-events-none duration-300 transition-transform', { 'scale-95': isDrag }]"
    >
      <button
        @click="$emit('update:updateState', false)"
        class="!absolute right-2 top-2 p-1 rounded-full bg-third group-hover:bg-w2 hover-w2"
      >
        <X :size="20" />
      </button>
      <div class="text-center">
        <div class="p-2 w-max rounded-full mx-auto group-hover:bg-w2 bg-third">
          <MonitorUp />
        </div>
        <p class="font-semibold text-lg">Add Photo/Video</p>
        <p class="text-sm">or drag and drop</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { X, MonitorUp, Pencil, CopyPlus } from 'lucide-vue-next';

const emit = defineEmits(['update:updateState', 'update:updateImages']);
const props = defineProps<{
  openPopup: boolean;
}>();

const images = ref<string[]>([]);
const imgGreaterThan4 = ref<string[]>([]);
const isDrag = ref(false);

const imgPreview = computed(() =>
  images.value.length === 2 ? 'flex'
    : images.value.length === 3 ? 'previews-img-3'
      : images.value.length === 4 ? 'previews-img-4'
        : ''
);

const handleFiles = (files: FileList) => {
  Array.from(files).forEach((file) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        imgGreaterThan4.value.push(reader.result);
        if (!(images.value.length < 4)) return;
        images.value.push(reader.result);
        emit('update:updateImages', imgGreaterThan4.value);
      } else {
        console.error('Unexpected FileReader result type:', typeof reader.result);
      }
    };

    reader.readAsDataURL(file);
  });
};

const browserFile = (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.closest('button') && !target.closest('.add-more')) return;

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/jpg, image/jpeg, image/png, image/gif, image/webp video/mp4';
  fileInput.multiple = true;
  fileInput.click();

  fileInput.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement;
    handleFiles(target.files!);
  });
};

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files) {
    handleFiles(event.dataTransfer.files);
  }
};

const resetUploadArea = () => {
  images.value = [];
  isDrag.value = false;
  imgGreaterThan4.value = [];
  emit('update:updateImages', []);
};

watch(() => props.openPopup, (newVal) => {
  if (!newVal) resetUploadArea();
});
</script>

<style scoped lang="scss">
.upload-area {
  &::before {
    @apply content-[''] absolute inset-0 bg-black bg-opacity-10 rounded-md opacity-0 duration-300 transition-opacity;
  }

  @apply hover:before:opacity-100;

  &.previews-img-3 {
    @apply grid grid-cols-2 grid-rows-2 [&_li:nth-child(3)]:col-span-3 [&_li_img]:h-[139px];
  }

  &.previews-img-4 {
    @apply grid grid-cols-2 [&_li_img]:h-[139px];
  }

  .upload-actions {
    @apply bg-white text-black rounded-md py-2 px-3 font-semibold flex items-center gap-2 active:scale-95;
  }
}
</style>