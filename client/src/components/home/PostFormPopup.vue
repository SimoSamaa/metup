<template>
  <div class="z-[1000] bg-black bg-opacity-50 fixed inset-0"></div>
  <main
    class="rounded-md z-[1001] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-w1 w-[500px] max-w-full border border-third max-[650px]:rounded-none"
  >
    <div class="p-4 flex items-center justify-between border-b border-third">
      <p class="text-xl font-semibold text-black">Create post</p>
      <base-button :circleBtn="true">
        <X />
      </base-button>
    </div>
    <div class="p-4 space-y-4">
      <div class="flex items-center gap-3">
        <router-link
          to="/profiled"
          class="size-[40px] rounded-full overflow-hidden"
        >
          <img
            :src="props.user.picture"
            alt="user-pic"
          >
        </router-link>
        <p class="font-semibold text-black">{{ fullName }}</p>
      </div>
      <div>
        <textarea
          v-focus
          :placeholder="`What's on your mind, ${props.user.firstName}?`"
          class="resize-none w-full outline-none placeholder:text-inherit text-xl"
          ref="textarea"
          v-model="postData"
        ></textarea>
        <!-- SELECT (BACKGROUND POST AND EMOJI) -->
        <div class="flex justify-between">
          <button
            v-if="!uploadSection"
            class="bg-post size-[36px] grid place-content-center rounded-lg text-white shadow-md not-allowed"
          >
            <Palette />
          </button>
          <div class="relative ml-auto">
            <base-button
              class="emoji"
              :circleBtn="true"
              @click="toggleEmojiPicker()"
            >
              <Smile />
              <BaseHover
                title="emoji"
                bottom="45px"
              />
            </base-button>
            <div
              v-if="emojiPicker"
              :class="['EmojiPicker-container absolute left-1/2 -translate-x-1/2', !uploadSection ? 'bottom-[50px]' : '-bottom-[330px] z-10']"
            >
              <EmojiPicker
                :native="true"
                @select="selectEmoji"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- ADD YOUR POST -->
      <div
        v-if="!uploadSection"
        class="px-4 py-2 rounded-md border border-third flex items-center justify-between shadow"
      >
        <p class="font-semibold text-black">Add to your post</p>
        <base-button
          @click="uploadSection = true"
          :circleBtn="true"
          class="text-green-500 hover-w2 bg-transparent"
        >
          <Images />
          <BaseHover
            title="photo/video"
            bottom="45px"
          />
        </base-button>
      </div>
      <!-- UPLOAD (IMAGES AND VIDEOS) -->
      <div
        v-else
        class="p-2 border border-third rounded-md"
      >
        <div
          @click="test()"
          @dragover.prevent="console.log('aa')"
          @drop.prevent="handleDrop($event)"
          class="h-[200px] bg-w2 rounded-md cursor-pointer hover:bg-third grid place-content-center relative group"
        >
          <img
            v-for="(img, ind) in images"
            :key="ind"
            :src="img"
            alt="image upload"
            class="h-[200px]"
          >
          <button
            @click="uploadSection = false"
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
      <base-button color="bg-blue2">Post</base-button>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue';
import { X, Smile, Palette, Images, MonitorUp } from 'lucide-vue-next';
import type { User } from '@/types/userTypes';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

const props = defineProps<{
  user: User;
}>();

const emojiPicker = ref(false);
const postData = ref('');
const uploadSection = ref(false);
const images = ref<string[]>([]);
const textarea = ref<HTMLTextAreaElement | null>(null);

const fullName = computed(() =>
  `${props.user.firstName} ${props.user.lastName}`
);

const selectEmoji = (emoji: { i: string; }) => {
  textarea.value = textarea.value as HTMLTextAreaElement;

  const startPos = textarea.value.selectionStart;
  const endPos = textarea.value.selectionEnd;

  const startText = postData.value.slice(0, startPos);
  const endText = postData.value.slice(endPos);
  const newText = `${startText}${emoji.i}${endText}`;

  postData.value = newText;
  textarea.value.focus();

  const newCursorPos = startPos + emoji.i.length;

  nextTick(() => {
    if (textarea.value) {
      textarea.value.setSelectionRange(newCursorPos, newCursorPos);
    }
  });
};

const toggleEmojiPicker = () => {
  emojiPicker.value = !emojiPicker.value;
};

const handleFiles = (files: FileList) => {
  Array.from(files).forEach((file) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        images.value.push(reader.result);
      } else {
        console.error('Unexpected FileReader result type:', typeof reader.result);
      }
    };

    reader.readAsDataURL(file);
  });
};

// Handle file input dialog
const test = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*, video/*';
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

const vFocus = {
  mounted: (el: HTMLElement) => {
    el.focus();
  }
};
</script>

<style scoped lang="scss">
@import '@/scss/helpers/mixins';

.bg-post {
  animation: palettes 4s linear infinite reverse;
  background: linear-gradient(45deg,
      theme('colors.red.400') 30%,
      theme('colors.green.400') 20%,
      theme('colors.green.400') 50%,
      theme('colors.blue.400') 40%,
      theme('colors.blue.400') 70%,
      theme('colors.yellow.400') 70%,
      theme('colors.yellow.400') 100%,
    );
  background-size: 1000%;

  &:is(:focus-visible, :hover) {
    animation-play-state: paused;
  }

  @keyframes palettes {

    0%,
    100% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }
  }
}

.EmojiPicker-container {
  @include breakpoint(null, 750) {
    @apply -left-[100px]
  }
}
</style>
