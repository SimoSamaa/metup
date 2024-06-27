<template>
  <main class="flex">
    <!-- LEFT SIDE -->
    <section class="home-sides max-lg:hidden">
      <ul>
        <li>
          <router-link to="/profile">
            <div>
              <img
                class="rounded-full"
                src="https://i.ibb.co/9ZxV6Sc/Whats-App-Image-2024-06-26-at-18-58-02.jpg"
                alt="user-pic"
              >
            </div>
            <p>li po</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'friends' }">
            <div>
              <img
                class="rounded-full"
                src="@/assets/home-left-side/friends.png"
                alt="user-pic"
              >
            </div>
            <p>find friends</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'watch' }">
            <div>
              <img
                class="rounded-full"
                src="@/assets/home-left-side/watch.png"
                alt="user-pic"
              >
            </div>
            <p>video</p>
          </router-link>
        </li>
        <li>
          <button>
            <div>
              <img
                class="rounded-full"
                src="@/assets/home-left-side/play.png"
                alt="user-pic"
              >
            </div>
            <p>play games</p>
          </button>
        </li>
      </ul>
    </section>
    <!-- APP CONTENT (POSTS, STORIES) -->
    <section class="flex-1 px-8 py-4">
      <div class="w-full max-w-[590px] mx-auto grid">
        <!-- STORES -->
        <MetupStories />
      </div>
    </section>
    <!-- RIGHT SIDE -->
    <section class="home-sides max-[950px]:hidden">
      <div class="flex items-center justify-between border-b-2 border-third pb-2">
        <p class="font-semibold">Contacts</p>
        <button
          class="right-side size-[30px] rounded-full grid place-content-center hover:bg-third focus-visible:bg-third relative"
        >
          <Search :size="20" />
          <BaseHover
            title="search by name"
            left="-26px"
          />
        </button>
      </div>
      <ul v-if="true">
        <li>
          <button>
            <div>
              <img
                class="rounded-full"
                src="https://i.ibb.co/9ZxV6Sc/Whats-App-Image-2024-06-26-at-18-58-02.jpg"
                alt="user-pic"
              >
              <span class="absolute right-0 bottom-0 bg-green-500 size-3 border-2 border-w2 rounded-full"></span>
            </div>
            <p>mohamed idbrahim</p>
          </button>
        </li>
      </ul>
      <p
        v-else
        class="flex items-center gap-2 font-semibold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-auto"
      >No Contacts
        <Frown :size="20" />
      </p>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Search, Frown } from 'lucide-vue-next';
import MetupStories from '@/components/home/MetupStories.vue';
</script>

<style scoped lang="scss">
main {

  // HOME SIDES (LEFT AND RIGHT)
  .home-sides {
    @apply relative w-[360px] max-2xl:w-[280px] h-[calc(100vh-57.6px)] max-[950px]:h-[calc(100vh-115.3px)] overflow-y-auto p-4;

    ul {
      @apply mt-2 grid gap-2;

      :is(li button, li a) {
        @apply flex items-center gap-2 p-4 rounded-md w-full hover:bg-third duration-300 transition-colors ease-out focus-visible:bg-third;

        div {
          @apply relative size-[36px] rounded-full;
        }

        p {
          @apply font-semibold capitalize text-black;
        }
      }
    }
  }
}
</style>