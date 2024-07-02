<template>
  <!-- ALERT -->
  <base-alert
    :show="!!showAlert"
    message='Register success! login and check your email'
    type="alert-info"
    custom="!top-4"
  ></base-alert>

  <section class="flex min-h-screen items-center px-4 relative z-10 isolate">
    <Logo3D />
    <div class="bg-white bg-opacity-50 p-4 flex-1 shadow-sm rounded-md max-w-lg mx-auto backdrop-hue-rotate-[45deg]">
      <div class="auth-actions relative flex mb-4 text-center">
        <span
          ref="activeAuth"
          class="absolute left-0 bg-blue-500 w-[50%] h-[48px] rounded-md transition-all ease-out duration-300"
        ></span>
        <button
          @click="activeAuthSec($event, 'login')"
          id="0"
          :class="['not-allowed', act === 'login' ? 'text-w1' : 'text-inherit']"
        >Login</button>
        <button
          @click="activeAuthSec($event, 'signup')"
          id="1"
          :class="['not-allowed', act === 'signup' ? 'text-w1' : 'text-inherit']"
        >Signup</button>
      </div>
      <component
        @set-signup-success="signupSuccess"
        :is="currentAuthSec"
      />
    </div>
    <div class="fixed bottom-8 left-1/2 -translate-x-1/2 text-blue2 font-bold text-3xl metup">METUP</div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Logo3D from '@/components/layouts/Logo3D.vue';
import loginSection from '@/components/auth/LoginSection.vue';
import SignupSection from '@/components/auth/SignupSection.vue';

const activeAuth = ref<null | HTMLElement>(null);
const showAlert = ref('');
const act = ref('login');

const currentAuthSec = computed(() => act.value === 'login' ? loginSection : SignupSection);

const activeAuthSec = (e: Event, authMode: string) => {
  const active = (activeAuth.value as HTMLElement);
  act.value = authMode;

  if (e.target instanceof HTMLElement) {
    const ind = Number(e.target.id);
    active.style.left = `${ind * 100 / 2}%`;
  }
};
const signupSuccess = (authMode: string | any) => {
  act.value = authMode;
  showAlert.value = authMode;
  const active = (activeAuth.value as HTMLElement);
  active.style.left = '0';

  setTimeout(() => showAlert.value = '', 5000);
};
</script>

<style lang="scss" scoped>
@import '@/scss/helpers/mixins.scss';

section {
  @include breakpoint('md') {
    @apply block;
  }

  &::before {
    @apply content-[''] absolute inset-0 z-[-1] backdrop-blur-[10vmax];
  }

  .auth-actions > * {
    @apply w-1/2 py-3 font-semibold isolate;
  }

  .blob {
    @apply w-[500px] aspect-[1/1] rounded-[50%] fixed z-[-2] animate-[rotate_10s_ease_infinite] bg-gradient-to-r from-[#7fffd4] to-[#9370d8];
  }

  .blob-1 {
    @apply left-[188px] top-[574px]
  }

  .blob-2 {
    @apply right-[-300px] top-[300px]
  }

  @keyframes rotate {

    0% {
      transform: translate(-50%, -50%) rotate(0);
    }

    50% {
      transform: translate(-50%, -50%) rotate(0) scaleY(1.5);
    }

    70% {
      transform: translate(-50%, -50%) rotate(0) scaleX(1.5);
    }

    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
}
</style>