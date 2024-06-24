<template>
  <header
    class="bg-w1 sticky top-0 px-4 shadow-sm border-b-2 border-third flex items-center justify-between text-[#606266]"
  >
    <!--  -->
    <div class="py-2 flex gap-2 relative w-[calc(300px+0.5rem)]">
      <div v-if="!focusSearch">
        <img
          class="size-10"
          src="@/assets/logo-2D.png"
          alt="logo"
        >
      </div>

      <div class="flex gap-2">
        <div
          v-if="focusSearch"
          class="hover:bg-w2 self-center cursor-pointer size-[36px] rounded-full grid place-content-center"
        >
          <ArrowLeft :size="20" />
        </div>
        <!-- SEARCH FIELD -->
        <div class="relative [&_svg]:w-[20px]">
          <input
            type="text"
            placeholder="Search Metup"
            class="placeholder:text-inherit bg-w2 rounded-full pr-4 pl-9 focus:pl-4 outline-none border border-third transition-all duration-200 ease-in-out w-[240px] h-[40px]"
            @focus="focusSearch = true"
            @blur="focusSearch = false"
          >
          <Search class="search absolute left-2 top-1/2 -translate-y-1/2" />
          <X class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
        </div>
        <!-- LIST -->
        <div
          v-if="focusSearch"
          class="-z-10 top-0 -left-4 absolute w-[calc(100%+1rem)] min-h-[100px] pt-[60px] bg-w1 shadow-xl rounded-b-lg"
        >
          <div class="flex justify-between p-4">
            <p class="font-semibold">Recent</p>
            <span class="text-blue-500">Edit</span>
          </div>
          <ul class="p-4">
            none
          </ul>
        </div>
      </div>
    </div>
    <!-- ROUTER LINKS -->
    <nav class="h-[57.7px] max-w-md w-full p-1 relative">
      <span
        ref="activePage"
        class="z-10 absolute left-0 bottom-0 w-[calc(100%/3)] h-[6px] rounded-t-xl bg-blue2 duration-300 ease-out transition-all"
      ></span>
      <ul
        ref="routerLinkContainer"
        class="flex h-[100%]"
      >
        <li>
          <router-link to="/home">
            <Home />
            <BaseHover title="home" />
          </router-link>
        </li>
        <li>
          <router-link to="/friends">
            <Users />
            <BaseHover title="friends" />
          </router-link>
        </li>
        <li>
          <router-link to="/watch">
            <TvMinimalPlay />
            <BaseHover title="watch" />
          </router-link>
        </li>
      </ul>
    </nav>
    <!-- USER ACTIONS -->
    <div class="user-actions flex gap-4">
      <button>
        <Mail />
        <BaseHover
          title="chats"
          bottom="-55px"
        />
      </button>
      <button>
        <Bell />
        <BaseHover
          title="notification"
          bottom="-55px"
        />
      </button>
      <button>
        <!-- <img
          src=""
          alt="profile"
        > -->
        <BaseHover
          title="account"
          bottom="-55px"
          left="0"
        />
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Search, X, Home, Users, TvMinimalPlay, LucidePenLine, ArrowLeft, Bell, Mail } from 'lucide-vue-next';
import BaseHover from '../UI/BaseHover.vue';

const activePage = ref<null | HTMLElement>(null);
const routerLinkContainer = ref<null | HTMLElement>(null);
const focusSearch = ref(false);

const activeRouterLinkPage = () => {
  const act = (activePage.value as HTMLSpanElement);
  const container = (routerLinkContainer.value as HTMLElement);
  const route = useRoute();

  const updateActivePage = (path: string) => {
    const index = ['/home', '/friends', '/watch'].indexOf(path);
    if (index !== -1) act.style.left = `${index * 100 / 3}%`;
  };

  updateActivePage(route.path);
  watch(route, (newRoute) => updateActivePage(newRoute.path));

  container.querySelectorAll('li').forEach((list) => {
    list.addEventListener('click', () => {
      updateActivePage(route.path);
    });
  });
};

onMounted(() => {
  activeRouterLinkPage();
});
</script>

<style lang="scss" scoped>
input:focus ~ .search {
  @apply hidden;
}

// ROUTER LINKS
nav {
  ul li {
    @apply w-[calc(100%/3)] duration-300 ease-out transition-all relative;

    &:hover {
      @apply bg-w2 rounded-md;
    }

    &:hover a.router-link-active {
      @apply bg-w1;
    }

    a {
      @apply h-full grid place-items-center;
    }

    a.router-link-active svg {
      @apply fill-blue2;
    }
  }
}

// USER ACTIONS
.user-actions {
  button {
    @apply bg-third size-[40px] rounded-full grid place-items-center cursor-pointer hover:bg-w2 relative;
  }
}
</style>
