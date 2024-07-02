<template>
  <base-alert
    :message="resendMess"
    :type="!resendErr ? 'alert-info' : 'alert-error'"
    :show="!!resendMess"
  ></base-alert>
  <div
    v-if="!props.user.verified"
    class="bg-w1 p-4 rounded-md shadow-md text-black max-[650px]:rounded-none"
  >
    <p>
      your account is not verify yet, verify it now before it gets deleted after month from creation.
    </p>
    <div class="ml-auto max-[650px]:ml-0 w-max">
      <a
        v-if="!isLoading"
        @click="resendVerificationEmail()"
        href="#"
        class="text-blue2 font-semibold flex gap-1 items-center  relative"
      >Resend verification email
        <SendHorizontal :size="20" />
      </a>
      <div
        v-else
        class="flex items-center gap-1 text-gray-400"
      >
        sending email
        <span className="loading loading-bars loading-xs"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { User } from '@/types/userTypes';
import { SendHorizontal } from 'lucide-vue-next';
import useAuthStore from '@/modules/auth/index';

const authStore = useAuthStore();

const props = defineProps<{
  user: User;
}>();

const resendMess = ref('');
const resendErr = ref(false);
const isLoading = ref(false);

const resendVerificationEmail = async () => {
  isLoading.value = true;

  try {
    const res = await authStore.resendActivatedLink();
    console.log(res);
    resendMess.value = res;
  } catch (err) {
    console.error(err);
    resendMess.value = (err as Error).message;
    resendErr.value = true;
  } finally {
    setTimeout(() => {
      resendMess.value = '';
      resendErr.value = false;
    }, 5000);
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
@import '@/scss/helpers/mixins';

a::before {
  @apply content-[''] absolute left-0 opacity-0 scale-0 -bottom-1 w-full h-[1px] bg-blue2 transition-all ease-out duration-300;

  &:hover {
    @apply bottom-0 opacity-100 scale-100;
  }

  @include breakpoint('md') {
    @apply bottom-0 opacity-100 scale-100;
  }
}
</style>