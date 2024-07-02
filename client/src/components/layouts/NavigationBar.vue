<template>
  <header class="bg-w1 sticky top-0 px-4 shadow-sm border-b-2 border-third z-[999]">
    <div class="flex items-center justify-between h-[56px]">
      <!-- NAVIGATION BAR (SEARCH) -->
      <NavSearch />
      <!-- NAVIGATION BAT (LINKS) -->
      <NavLinks class="max-[950px]:hidden" />
      <!-- NAVIGATION BAR (ACTIONS) -->
      <div class="user-actions flex gap-4">
        <button>
          <MessagesSquare />
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
        <button @click="toggleAccountMenu()">
          <img
            class="img-profile-nav rounded-full"
            :src="user.picture"
            alt="user-pic"
          >
          <BaseHover
            title="account"
            bottom="-55px"
            left="0"
          />
        </button>
      </div>
    </div>
    <!--  ACCOUNT MENU -->
    <AccountMenu
      :user
      v-model="showAccountMenu"
    />
    <!-- NAVIGATION BAR (LINKS RESPONSIVE MOBILE) -->
    <NavLinks class="min-[950px]:hidden -z-20" />
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import NavSearch from './includes/NavSearch.vue';
import NavLinks from './includes/NavLinks.vue';
import AccountMenu from './includes/AccountMenu.vue';
import useAuthStore from '@/modules/auth/index';
import { Bell, MessagesSquare } from 'lucide-vue-next';

const authStore = useAuthStore();

const user = computed(() => authStore.user);

const showAccountMenu = ref(false);

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value ? true : false;
};

</script>

<style lang="scss" scoped>
// USER ACTIONS
.user-actions {
  button {
    @apply bg-w2 size-[40px] rounded-full grid place-items-center cursor-pointer relative;
  }
}
</style>
