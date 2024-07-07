<template>
  <PostFormPopup
    :user="props.user"
    v-model="openPopup"
  />
  <main class="p-4 bg-w1 rounded-md max-[650px]:rounded-none mt-4 shadow-md">
    <div class="flex gap-4">
      <router-link
        to="/profile"
        class="size-[40px] rounded-full overflow-hidden"
      >
        <img
          :src="user.picture"
          alt="user-pic"
        >
      </router-link>
      <button
        @click="openPopup = true"
        class="flex-1 text-left px-4 rounded-badge bg-w2 max-[365px]:text-sm"
      >
        What's on your mind, {{ props.user.firstName }}?
      </button>
    </div>
    <div class="post-btn flex mt-4 pt-2 border-t border-third">
      <button class="hover-w2">
        <Video class="text-red-500" />
        Live Video
      </button>
      <button class="hover-w2">
        <Images class="text-green-500" />
        Photo/Video
      </button>
      <button class="hover-w2">
        <Laugh class="text-yellow-500" />
        Feeling/Activity
      </button>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue';
import { Video, Images, Laugh } from 'lucide-vue-next';
import type { User } from '@/types/userTypes';
const PostFormPopup = defineAsyncComponent({ loader: () => import('./PostFormPopup.vue') });

const props = defineProps<{
  user: User;
}>();

const openPopup = ref(false);
</script>

<style lang="scss" scoped>
.post-btn button {
  @apply flex-1 rounded-md justify-center flex gap-2 text-center font-semibold py-2;

  &:last-child {
    @apply max-[650px]:hidden;
  }
}
</style>