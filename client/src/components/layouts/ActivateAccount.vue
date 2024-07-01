<template>
  <div class="z-[100] p-10 fixed size-full bg-black bg-opacity-50 opacity-0 popup-bg"></div>
  <div
    class="z-[200] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-w1 p-4 rounded-md w-[350px] max-w-[calc(100%-1rem)] scale-0 popup"
  >
    <h3 :class="['mb-4 pb-4 border-b-2 border-third text-center']">Please active your account</h3>
    <base-button
      v-if="test"
      @click="activateAccount()"
      color="bg-green-500"
      :loading="isLoading"
    >Activate now</base-button>
    <p
      v-else
      :class="['flex items-center justify-center gap-1 font-semibold', message.state]"
    >{{ message.value }}
      <ShieldX v-if="message.state === 'text-red-500'" />
      <ShieldCheck v-else />
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useAuthStore from '@/modules/auth/index';
import { ShieldX, ShieldCheck } from 'lucide-vue-next';

const props = defineProps<{
  token: string;
}>();

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const test = ref(true);
const message = reactive({
  value: '',
  state: '',
});

const activateAccount = async () => {
  isLoading.value = true;

  try {
    await authStore.activateAccount({ token: props.token });
    message.value = 'Account activated successfully';
    message.state = 'text-green-500';
    setTimeout(() => router.push({ name: 'home' }), 2000);
  } catch (err) {
    console.error(err);
    message.value = (err as Error).message;
    message.state = 'text-red-500';
    setTimeout(() => router.push({ name: 'home' }), 2000);
  } finally {
    isLoading.value = false;
    test.value = false;
  }
};
const setScrollBehavior = () => {
  document.body.style.overflowY = route.name === 'activate' ? 'hidden' : 'auto';
};

onMounted(() => setScrollBehavior());
onUnmounted(() => setScrollBehavior());
</script>

<style scoped lang="scss">
$classes: (
  'popup',
  'popup-bg',
);

@each $class in $classes {
  .#{$class} {
    animation: #{$class} 500ms ease-in-out forwards;
  }

  @keyframes #{$class} {
    to {
      @if($class =='popup') {
        @apply scale-100
      }

      @else {
        @apply opacity-100
      }
    }
  }
}
</style>
