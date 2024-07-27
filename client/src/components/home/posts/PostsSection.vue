<template>
  <base-alert
    :show="!!postsErr"
    :message="postsErr"
    type="alert-error"
  ></base-alert>
  <ul class="mt-4 grid gap-4">
    <li
      v-for="post in posts"
      :key="post._id"
      class="p-4 bg-w1 rounded-md shadow-md"
    >
      <div class="flex items-center justify-between">
        <div class="flex gap-2 items-center">
          <router-link to="/profile">
            <img
              :src="post.user.picture"
              alt="avatar"
              class="size-10 rounded-full"
            />
          </router-link>
          <div>
            <div class="flex items-center gap-1">
              <div class="font-semibold text-black">
                {{ `${post.user.firstName} ${post.user.lastName}` }}
              </div>
              <div :class="['relative verified-badge', post.user.verified ? 'text-blue2' : 'text-red-500']">
                <BadgeCheck
                  v-if="post.user.verified"
                  :size="16"
                />
                <BadgeX
                  v-else
                  :size="16"
                />
                <BaseHover :title="`account ${post.user.verified ? 'verified' : 'not verified'}`" />
              </div>
            </div>
            <div class="flex items-center">
              <!-- TIME AGO -->
              <div class="time-ago cursor-pointer relative">
                <TimeAgo :date="post.createdAt" />
                <BaseHover :title="new Date(post.createdAt).toLocaleString()" />
              </div>
              <Dot :size="12" />
              <!-- SHOWING POST MODE -->
              <div class="post-showing cursor-pointer relative">
                <Globe :size="12" />
                <BaseHover title="public" />
              </div>
            </div>
          </div>
        </div>
        <!-- POST ACTIONS -->
        <div class="flex gap-2">
          <base-button :circleBtn="true">
            <Ellipsis :size="20" />
          </base-button>
          <base-button
            :circleBtn="true"
            @click="deletePostClient(post._id)"
          >
            <X :size="20" />
          </base-button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import postAuthStore from '@/modules/post/index';
import useHelpers from '@/hooks/helpers';
import TimeAgo from '../../layouts/TimeAgo.vue';
import type { Posts } from '../../../types/postTypes';
import { Globe, Dot, BadgeCheck, BadgeX, X, Ellipsis } from 'lucide-vue-next';

const { usePath } = useHelpers();

const postStore = postAuthStore();

const postsErr = ref('');

const posts = computed(() => postStore.getPosts);

// DELETE POST FROM CLIENT
const deletePostClient = (id: string) => {
  const deletedPost = posts.value.filter((post: Posts) => post._id !== id);
  postStore.posts = deletedPost;
};

const loadPosts = async () => {
  try {
    await postStore.fetchPosts();
  } catch (err) {
    console.error(err);
    postsErr.value = (err as Error).message;
    setTimeout(() => postsErr.value = '', 5000);
  }
};

onMounted(() => {
  loadPosts();
});
</script>