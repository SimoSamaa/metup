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
    <a
      @click="resendVerificationEmail()"
      href="#"
      class="w-max text-blue2 font-semibold flex gap-1 items-center group ml-auto"
    >Resend verification email
      <SendHorizontal
        class="group-hover:ml-2 duration-300 ease-out transition-all"
        :size="20"
      />
    </a>
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

const resendVerificationEmail = async () => {
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
  }
};
</script>

<style scoped lang="scss"></style>