<template>
  <base-alert
    :show="!!postsErr"
    :message="postsErr"
    type="alert-error"
  ></base-alert>
  <ul class="mt-4 grid gap-4 pb-4">
    <li
      v-for="post in posts"
      :key="post._id"
      class="bg-w1 rounded-md shadow-md max-[650px]:rounded-none"
      style="min-width: -webkit-fill-available;"
    >
      <div class="flex items-center justify-between p-4">
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
              <div :class="['relative verified-badge', post.user.verified || verified ? 'text-blue2' : 'text-red-500']">
                <BadgeCheck
                  v-if="post.user.verified || verified"
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
      <!--  -->
      <div :class="['pt-0 break-words', post.text.length >= 105 ? 'text-md' : 'text-xl', { 'p-4': !post.bgPost }]">
        <div v-if="post.text.length >= 400">
          <p v-html="postTextSlice(post._id, formatPostContent(post.text))"></p>
          <button
            class="ml-auto block not-allowed font-semibold hover:underline"
            @click="showPostText(post._id)"
          >
            See {{ expandedPosts.includes(post._id) ? 'less' : 'more' }}
          </button>
        </div>
        <div
          v-else
          :class="{ 'break-all aspect-[16/11.1] grid place-content-center text-white font-semibold text-3xl px-[30px] py-[50px] text-center': post.bgPost }"
          :style="backgroundStyle(String(post.bgPost))"
        >
          <p v-html="formatPostContent(post.text)"></p>
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

const props = defineProps<{
  verified: boolean;
}>();

const postStore = postAuthStore();

const postsErr = ref('');

const posts = computed(() => postStore.getPosts);

const expandedPosts = ref<string[]>([]);

// SLICING POST TEXT
const postTextSlice = computed(() => {
  return (id: string, text: string) => {
    return !expandedPosts.value.includes(id) ? text.slice(0, 400) + '...' : text;
  };
});

/*
  A COMPUTED FUNCTION TO CHECK IF POST HAVE 
  LINK AND CONVERT IT TO ANCHOR TAG AND ADD BREAK LINE
*/
const formatPostContent = computed(() => {
  const linkRegex = /((http|https):\/\/[^\s]+)/g;
  return (text: string) => {
    text = text.replace(linkRegex, (match) => {
      const link = match.length > 43 ? match.slice(0, 43) + '...' : match;
      return `<a href="${match}" target="_blank" class="text-blue2 inline-block hover:underline">${link}</a>`;
    });

    return text.replace(/\n/g, '<br />');
  };
});

// 
const backgroundStyle = computed(() => {
  return (bgPost: string) => {
    return {
      background: bgPost.startsWith('#')
        ? bgPost
        : `url(${usePath.value(bgPost)}) no-repeat center/cover`
    };
  };
});

// SHOWING ONE TEXT POST IN EACH CLICK
const showPostText = (id: string) => {
  if (expandedPosts.value.includes(id)) {
    expandedPosts.value = expandedPosts.value.filter(postId => postId !== id);
  } else {
    expandedPosts.value.shift();
    expandedPosts.value.push(id);
  }
};

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

<!--
  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssssssssssssssssssss
 -->