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
      >please enter a valid email</div>
      <div class="input-container">
        <input
          type="text"
          placeholder="Email address"
          v-model.trim="loginDataForm.email.value"
          :class="{ 'input-error': !loginDataForm.email.isValidate }"
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
        >
        <Info v-if="!loginDataForm.password.isValidate" />
      </div>
      <div
        class="error-message arrow-top"
        v-if="!loginDataForm.password.isValidate"
      >password required</div>
    </div>
    <button
      type="submit"
      class="custom-btn bg-blue2 hover:bg-blue-700"
    >Log in</button>
    <p class="text-center text-blue2">Forgotten password</p>
  </form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Info } from 'lucide-vue-next';

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

const checkValidationInput = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  validateForm.value = true;

  if (!emailRegex.test(loginDataForm.email.value)) {
    loginDataForm.email.isValidate = false;
    validateForm.value = false;
  } else {
    loginDataForm.email.isValidate = true;
  }

  if (!loginDataForm.password.value || loginDataForm.password.value.length < 6) {
    loginDataForm.password.isValidate = false;
    validateForm.value = false;
  } else {
    loginDataForm.password.isValidate = true;
  }
};

const submitLoginForm = async () => {
  checkValidationInput();
  if (!validateForm.value) return;
  validateForm.value = true;

  try {
    console.log({
      email: loginDataForm.email.value,
      password: loginDataForm.password.value
    },);
  } catch (err) {
    console.log((err as { message: string; }));
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/helpers/mixins';
</style>