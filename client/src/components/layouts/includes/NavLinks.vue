<template>
  <nav class="h-[57.7px] max-[950px]:max-w-full max-w-md w-full py-1 relative">
    <span
      ref="activePage"
      class="z-10 absolute rounded-t-xl bottom-0 w-[calc(100%/3)] h-[6px] bg-blue2 duration-300 ease-out transition-all"
    ></span>
    <ul
      ref="routerLinkContainer"
      class="flex gap-1 h-[100%]"
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
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Home, Users, TvMinimalPlay } from 'lucide-vue-next';

const activePage = ref<null | HTMLElement>(null);
const routerLinkContainer = ref<null | HTMLElement>(null);

const activeRouterLinkPage = () => {
  const act = (activePage.value as HTMLSpanElement);
  const container = (routerLinkContainer.value as HTMLElement);
  const route = useRoute();

  const updateActivePage = (path: string) => {
    const index = ['/home', '/friends', '/watch'].indexOf(path);
    if (index !== -1) act.style.left = `${(index * (100) / 3)}%`;

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

<style scoped lang="scss">
nav {
  ul li {
    @apply w-[calc(100%/3)] relative;

    a {
      @apply h-full grid place-items-center rounded-md duration-300 ease-out transition-colors hover:bg-w2 focus-visible:bg-w2;

      &.router-link-active {
        @apply bg-w1 outline-none;

        & div {
          @apply hidden;
        }
      }

      &.router-link-active svg {
        @apply stroke-blue2;
      }
    }
  }
}
</style>