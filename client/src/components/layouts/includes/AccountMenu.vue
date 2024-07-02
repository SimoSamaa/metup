<template>
  <transition name="account-menu">
    <div
      v-if="props.modelValue"
      class="menu p-4 w-[300px] border-2 border-third right-4 top-16 bg-w1 shadow-lg rounded-md absolute font-semibold"
    >
      <div
        to="/profile"
        class="grid justify-center gap-1 py-4 border-b-2 border-third relative"
      >
        <button
          @click="emit('update:modelValue', false)"
          class="hover-w2 absolute grid place-content-center size-[36px] rounded-full bg-third"
        >
          <ArrowLeft :size="20" />
        </button>
        <router-link
          to="/profile"
          class="size-20 rounded-full overflow-auto mx-auto"
        >
          <img
            :src="props.user.picture"
            alt="user-pic"
          >
        </router-link>
        <p>{{ fullName }}</p>
      </div>
      <ul class="grid gap-2 mt-4">
        <li>
          <button
            @click="logout()"
            class="hover-w2 p-2 w-full text-left rounded-md !hover:bg-red-500 flex gap-2 items-center"
          >
            <div class="size-[36px] rounded-full grid place-content-center bg-third">
              <LogOut :size="20" />
            </div>
            Logout
          </button>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import { LogOut, ArrowLeft } from 'lucide-vue-next';
import useAuthStore from '@/modules/auth/index';
import type { User } from '@/types/userTypes';

const props = defineProps<{
  user: User;
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const router = useRouter();

const fullName = computed(() => `${props.user.firstName} ${props.user.lastName}`);

const logout = () => {
  const authStore = useAuthStore();

  localStorage.removeItem('user');
  authStore.$state.user.token = null;
  router.push({ name: 'auth' });
  authStore.$reset();
};

const handleScrollBarAccountMenu = () => {
  const matchMedia = window.matchMedia('(max-width: 650px)');

  const handleScrollBar = (e: MediaQueryListEvent) => {
    if (e.matches) {
      document.body.style.overflow = props.modelValue ? 'hidden' : 'auto';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  handleScrollBar(Object.create(null, {
    currentTarget: {
      value: matchMedia,
    },
  }));

  matchMedia.addListener(handleScrollBar);
};

const handleAccountMenu = (e: Event) => {
  const target = e.target as HTMLElement;
  const toggleEle = target.matches('.img-profile-nav');
  const menuElement = target.closest('.menu');
  const matchesEle = !!menuElement;

  if (!(toggleEle === false && matchesEle === false)) return;
  emit('update:modelValue', false);
};

onMounted(() => {
  document.addEventListener('click', handleAccountMenu);
});


onUpdated(() => handleScrollBarAccountMenu());
</script>

<style scoped lang="scss">
@import '@/scss//helpers/mixins';

@include breakpoint('sm') {
  .menu {
    @apply fixed inset-0 w-auto rounded-none;
  }
}

@include setAnimation('account-menu', null, null, 'opacity')
</style>