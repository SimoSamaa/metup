<template>
  <main class="p-4 bg-w1 rounded-md max-[650px]:rounded-none mt-4 shadow-md">
    <div class="flex gap-4">
      <div class="size-[40px] rounded-full overflow-hidden">
        <img
          src="https://i.ibb.co/9ZxV6Sc/Whats-App-Image-2024-06-26-at-18-58-02.jpg"
          alt="user-pic"
        >
      </div>
      <button class="flex-1 text-left px-4 rounded-badge bg-w2 max-[365px]:text-sm">
        What's on your mind?, first name?
      </button>
    </div>
    <div class="post-btn flex mt-4 pt-2 border-t border-third">
      <button>
        <Video class="text-red-500" />
        Live Video
      </button>
      <button>
        <Images class="text-green-500" />
        Photo/Video
      </button>
      <button class="">
        <Laugh class="text-yellow-500" />
        Feeling/Activity
      </button>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Video, Images, Laugh } from 'lucide-vue-next';
</script>

<style lang="scss" scoped>
.post-btn button {
  @apply flex-1 rounded-md justify-center flex gap-2 text-center font-semibold py-2;

  &:last-child {
    @apply max-[650px]:hidden;
  }
}
</style>