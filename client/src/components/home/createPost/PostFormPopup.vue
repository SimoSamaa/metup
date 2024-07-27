<template>
  <base-alert
    :show="openPopup && !!postErr"
    :message="postErr"
    type="alert-error"
    custom="!top-4"
  ></base-alert>
  <transition name="backdrop">
    <div
      @click="emit('update:openPopup', false);"
      class="z-[1000] bg-black bg-opacity-50 fixed inset-0"
      v-show="openPopup"
    ></div>
  </transition>
  <transition name="translate-popup">
    <main
      v-show="openPopup"
      class="rounded-md z-[1001] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-w1 w-[500px] max-w-full border border-third max-[650px]:rounded-none"
    >
      <div class="p-4 flex items-center justify-between border-b border-third">
        <p class="text-xl font-semibold text-black">Create post</p>
        <base-button
          @click="emit('update:openPopup', false)"
          :circleBtn="true"
        >
          <X />
        </base-button>
      </div>
      <form @submit.prevent="submitPost()">
        <div class="flex items-center gap-3 p-4">
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
        <!-- SET BACKGROUND FOR POST -->
        <div class="relative">
          <label
            v-if="bgPost"
            class=" aspect-[16/11.1] grid place-items-center"
            :style="backgroundStyle"
          >
            <textarea
              ref="textarea"
              v-focus
              class="text-center bg-transparent resize-none w-full outline-none placeholder:text-[#ffffff94] text-[] text-white px-4 pb-4 font-bold"
              :placeholder="`What's on your mind, ${props.user.firstName}?`"
              v-model="postData"
              @input="growHeight($event)"
              style="font-size: clamp(20px, 5vw, 24px);"
            ></textarea>
          </label>
          <textarea
            v-focus
            v-else
            :placeholder="`What's on your mind, ${props.user.firstName}?`"
            :class="['resize-none w-full outline-none placeholder:text-inherit px-4 pb-4', postData.length >= 106 ? 'text-[15px]' : 'text-xl']"
            @input="growHeight($event)"
            ref="textarea"
            v-model="postData"
          ></textarea>
          <!-- SELECT (BACKGROUND POST AND EMOJI) -->
          <div :class="['flex justify-between px-4 w-full', bgPost ? 'absolute bottom-4' : '']">
            <!-- SELECT BACKGROUND POST -->
            <SelectPostBg
              @set-cancelBgPost="cancelBgPost"
              @set-selectBgClr="selectBgClr"
              v-model:openChooseBg="openChooseBg"
              v-if="!uploadSection"
              v-show="chooseBg && postData.length <= 157"
              v-model="chooseBg"
              :bgPost
            />
            <button
              v-if="!uploadSection && !chooseBg && postData.length <= 157"
              @click="chooseBg = true"
              class="bg-post size-[36px] grid place-content-center rounded-lg text-white shadow-md not-allowed"
            >
              <Palette />
            </button>
            <div class="relative ml-auto">
              <base-button
                class="emoji"
                :circleBtn="true"
                @click="toggleEmojiPicker()"
                type="button"
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
        <div class="p-4 space-y-4">
          <!-- ADD YOUR POST -->
          <div
            v-show="!bgPost"
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
          <UploadPostMedia
            v-model:updateState="uploadSection"
            v-model:updateImages="images"
            :openPopup
            v-else
          />
          <base-button
            color="bg-blue2"
            :disabled="images.length === 0 && !postData || isLoading || !!postErr"
            :loading="isLoading"
            ref="submitBtn"
          >Post</base-button>
        </div>
      </form>
      <ChooseBgImg
        v-model:openChooseBg="openChooseBg"
        @set-selectBgImagePost="selectBgImagePost"
      />
    </main>
  </transition>
</template>

<script lang="ts" setup>
import 'vue3-emoji-picker/css';
import { ref, computed, nextTick, onUpdated, defineAsyncComponent, watch } from 'vue';
import { X, Smile, Palette, Images } from 'lucide-vue-next';
import type { User } from '@/types/userTypes';
import EmojiPicker from 'vue3-emoji-picker';
import useHelpers from '@/hooks/helpers';
import usePostStore from '@/modules/post/index';
import dataURItoBlob from '@/hooks/dataURLtoBlob';

const SelectPostBg = defineAsyncComponent({ loader: () => import('./SelectPostBg.vue') });
const UploadPostMedia = defineAsyncComponent({ loader: () => import('./UploadPostMedia.vue') });
const ChooseBgImg = defineAsyncComponent({ loader: () => import('./ChooseBgImg.vue') });

const { usePath } = useHelpers();

const emit = defineEmits(['update:openPopup']);

const props = defineProps<{
  user: User;
  openPopup: boolean;
  openPopupUpload: boolean;
}>();

const emojiPicker = ref(false);
const postData = ref('');
const uploadSection = ref(false);
const images = ref<string[]>([]);
const textarea = ref<HTMLTextAreaElement | null>(null);
const chooseBg = ref(false);
const bgPost = ref('');
const openChooseBg = ref(false);
const isLoading = ref(false);
const postErr = ref('');

watch(() => props.openPopup, (_, oldVal) => {
  if (oldVal === false && props.openPopupUpload === true) {
    uploadSection.value = true;
  }
});

const fullName = computed(() =>
  `${props.user.firstName} ${props.user.lastName}`
);

const backgroundStyle = computed(() => {
  return {
    background: bgPost.value.startsWith('#')
      ? bgPost.value
      : `url(${usePath.value(bgPost.value)}) no-repeat center/cover`
  };
});

const selectBgClr = (bgColor: string) => {
  bgPost.value = bgColor;
  textarea.value?.focus();
};

const cancelBgPost = (cancel: boolean) => {
  if (!cancel) bgPost.value = '';
  sessionStorage.removeItem('bgPost');
};

const selectBgImagePost = (bgImg: string) => bgPost.value = bgImg;
const toggleEmojiPicker = () => emojiPicker.value = !emojiPicker.value;

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

const growHeight = (e: Event) => {
  const element = e.target as HTMLTextAreaElement;

  if (postData.value.length >= 420) {
    element.style.overflowY = 'auto';
  } else {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  }

  let save: string | undefined | any;
  if (bgPost.value && postData.value.length >= 157) {
    const copy = bgPost.value;
    bgPost.value = '';
    save = copy;

    if (save === undefined) return;
    sessionStorage.setItem('bgPost', save);
  } else if (!bgPost.value && postData.value.length <= 157) {
    bgPost.value = sessionStorage['bgPost'] || bgPost.value;
  }
};

let intervalId: number | undefined;
const submitPost = async () => {
  const postStore = usePostStore();

  // CONVERT IMAGES BASE64 TO BLOB
  const blobImages = images.value.map((img) => dataURItoBlob(img));
  const path = `${props.user.username}/postsImages`;

  try {
    isLoading.value = true;

    if (images.value && images.value.length > 0) {
      await postStore.uploadImages({ path, blobImages });
    }

    if (postData.value !== '' || images.value.length > 0) {
      await postStore.createPost({
        text: postData.value,
        bgPost: bgPost.value || null,
        images: postStore.getImages,
      });
      postStore.images = [];
    }

    emit('update:openPopup', false);
    uploadSection.value = false;
    emojiPicker.value = false;
    postData.value = '';
    images.value = [];
    bgPost.value = '';
  } catch (err) {
    console.error(err);
    postErr.value = (err as Error).message;
    clearTimeout(intervalId);
    intervalId = setTimeout(() => postErr.value = '', 5000);
  } finally {
    isLoading.value = false;
  }
};

const vFocus = {
  mounted: (el: HTMLElement) => {
    el.focus();
  }
};

const handleScrollBarPopupForm = () => {
  nextTick(() => {
    document.body.style.overflow = props.openPopup ? 'hidden' : 'auto';
  });
};

onUpdated(() => {
  handleScrollBarPopupForm();
  window.onbeforeunload = () => {
    sessionStorage.removeItem('bgPost');
  };
});
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

@include setAnimation('backdrop', null, null, 'opacity');
@include setAnimation('translate-popup', (translate: 0 -100px), (translate: 0), null);
</style>
