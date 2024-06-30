<template>
  <form
    @submit.prevent="submitLoginForm()"
    class="grid gap-4"
  >
    <!-- EMAIL -->
    <div class="data-field ">
      <div
        class="error-message arrow-bottom"
        v-if="!loginDataForm.email.isValidate"
      >{{ emailErrMess }}</div>
      <div class="input-container">
        <input
          type="text"
          placeholder="Email address"
          v-model.trim="loginDataForm.email.value"
          :class="{ 'input-error': !loginDataForm.email.isValidate }"
          @blur="clearValidity('email')"
        >
        <Info v-if="!loginDataForm.email.isValidate" />
      </div>
    </div>
    <!-- PASSWORD -->
    <div class="data-field">
      <div class="input-container">
        <input
          type="password"
          placeholder="Password"
          v-model.trim="loginDataForm.password.value"
          :class="{ 'input-error': !loginDataForm.password.isValidate }"
          @blur="clearValidity('password')"
        >
        <Info v-if="!loginDataForm.password.isValidate" />
      </div>
      <div
        class="error-message arrow-top"
        v-if="!loginDataForm.password.isValidate"
      >{{ passwordErrMess }}</div>
    </div>
    <div>
      <base-button
        color="bg-blue2"
        :loading="isLoading"
      >Log in</base-button>
      <p class="text-red-500 font-semibold mt-2">{{ serverMess }}</p>
    </div>
    <p class="text-center text-blue2">Forgotten password</p>
  </form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '@/modules/auth/index';
import { Info } from 'lucide-vue-next';

const authStore = useAuthStore();
const router = useRouter();

const loginDataForm = reactive({
  email: {
    value: '',
    isValidate: true,
  },
  password: {
    value: '',
    isValidate: true,
  },
});

const validateForm = ref(true);
const isLoading = ref(false);
const serverMess = ref('');
const emailErrMess = ref('');
const passwordErrMess = ref('');

const clearValidity = (input: string) => {
  type ElementKey = { [key: string]: { isValidate: boolean; }; };
  (loginDataForm as ElementKey)[input].isValidate = true;
};

const checkValidationInput = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  validateForm.value = true;

  if (!loginDataForm.email.value) {
    loginDataForm.email.isValidate = false;
    validateForm.value = false;
    emailErrMess.value = 'Email required';
  } else if (!emailRegex.test(loginDataForm.email.value)) {
    loginDataForm.email.isValidate = false;
    validateForm.value = false;
    emailErrMess.value = 'please enter a valid email';
  } else {
    loginDataForm.email.isValidate = true;
  }

  if (!loginDataForm.password.value) {
    loginDataForm.password.isValidate = false;
    validateForm.value = false;
    passwordErrMess.value = 'password required';
  } else if (loginDataForm.password.value.length < 8) {
    passwordErrMess.value = 'password must be at least 8 characters';
    loginDataForm.password.isValidate = false;
    validateForm.value = false;
  }
  else {
    loginDataForm.password.isValidate = true;
  }
};

const submitLoginForm = async () => {
  checkValidationInput();
  if (!validateForm.value) return;
  validateForm.value = true;

  try {
    isLoading.value = true;
    await authStore.login({
      email: loginDataForm.email.value,
      password: loginDataForm.password.value
    });

    router.replace({ name: 'home' });

  } catch (err) {
    console.error('error from login', (err));
    const errMess = (err as { message: string; }).message;
    serverMess.value = errMess;
  } finally {
    isLoading.value = false;
  }
};
</script>