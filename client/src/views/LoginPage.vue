<template>
  <section class="flex min-h-screen items-center px-4 relative z-10 isolate">
    <Logo3D />
    <div class="bg-white bg-opacity-50 p-4 flex-1 shadow-sm rounded-md max-w-lg mx-auto">
      <form
        @submit.prevent
        class="grid gap-4 border-b-2 border-third pb-4"
      >
        <div class="input-container">
          <input
            type="text"
            placeholder="Email address"
          >
        </div>
        <div class="input-container">
          <input
            type="password"
            placeholder="Password"
          >
        </div>
        <button
          type="submit"
          class="custom-btn bg-blue2 hover:bg-blue-700"
        >Log in</button>
        <p class="text-center text-blue2">Forgotten password</p>
      </form>
      <button class="custom-btn mt-4 bg-green-500 hover:bg-green-600">Create account</button>
    </div>
    <div class="fixed bottom-8 left-1/2 -translate-x-1/2 text-blue2 font-bold text-3xl metup">METUP</div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
  </section>
</template>

<script lang="ts" setup>
import Logo3D from '@/components/Logo3D.vue';
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

  div:not(.metup) {
    @apply backdrop-hue-rotate-[45deg];
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

    to {
      transform: translate(-50%, -50%) rotate(0);
    }

    50% {
      transform: translate(-50%, -50%) rotate(0) scaleY(1.5);
    }

    70% {
      transform: translate(-50%, -50%) rotate(0) scaleX(1.5);
    }

    from {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
}

.input-container {
  @apply relative rounded-md;

  input {
    @apply h-[48px] border-third border-2 rounded-md px-4 w-full duration-300 ease-out transition-all bg-transparent;

    &:focus {
      @apply outline-none ring-offset-0 ring-blue-300 ring-4 border-blue-500 border-2;
    }
  }
}

.custom-btn {
  @apply h-[48px] text-white rounded-md w-full duration-300 ease-out transition-all font-semibold;
}
</style>