<template>
  <header class="bg-w1 sticky top-0 px-4 shadow-sm border-b-2 border-third text-[#606266]">
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
    </div>
    <!-- NAVIGATION BAR (LINKS RESPONSIVE MOBILE) -->
    <NavLinks class="min-[950px]:hidden -z-20" />
  </header>
</template>

<script lang="ts" setup>
import NavSearch from './includes/NavSearch.vue';
import NavLinks from './includes/NavLinks.vue';
import { Bell, MessagesSquare } from 'lucide-vue-next';
</script>

<style lang="scss" scoped>
// USER ACTIONS
.user-actions {
  button {
    @apply bg-w2 size-[40px] rounded-full grid place-items-center cursor-pointer hover:bg-third relative;
  }
}
</style>
