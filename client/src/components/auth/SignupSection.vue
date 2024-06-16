<template>
  <form
    @submit.prevent="submitSignupForm()"
    class="grid gap-4"
  >
    <div class="flex gap-4 items-end">
      <!-- FIRST NAME -->
      <div class="data-field ">
        <div
          class="error-message arrow-bottom"
          v-if="!signupDataForm.firstName.isValidate"
        >first name required</div>
        <div class="input-container">
          <input
            type="text"
            placeholder="First name"
            v-model.trim="signupDataForm.firstName.value"
            :class="{ 'input-error': !signupDataForm.firstName.isValidate }"
          >
          <Info v-if="!signupDataForm.firstName.isValidate" />
        </div>
      </div>
      <!-- LAST NAME -->
      <div class="data-field">
        <div
          class="error-message arrow-bottom last-name"
          v-if="!signupDataForm.lastName.isValidate"
        >last name required</div>
        <div class="input-container">
          <input
            type="text"
            placeholder="Last name"
            v-model.trim="signupDataForm.lastName.value"
            :class="{ 'input-error': !signupDataForm.lastName.isValidate }"
          >
          <Info v-if="!signupDataForm.lastName.isValidate" />
        </div>
      </div>
    </div>
    <!-- EMAIL -->
    <div class="data-field ">
      <div
        class="error-message arrow-bottom"
        v-if="!signupDataForm.email.isValidate"
      >please enter a valid email</div>
      <div class="input-container">
        <input
          type="text"
          placeholder="Email address"
          v-model.trim="signupDataForm.email.value"
          :class="{ 'input-error': !signupDataForm.email.isValidate }"
        >
        <Info v-if="!signupDataForm.email.isValidate" />
      </div>
    </div>
    <!-- PASSWORD -->
    <div class="data-field">
      <div class="input-container">
        <input
          type="password"
          placeholder="Password"
          v-model.trim="signupDataForm.password.value"
          :class="{ 'input-error': !signupDataForm.password.isValidate }"
        >
        <Info v-if="!signupDataForm.password.isValidate" />
      </div>
      <div
        class="error-message arrow-top"
        v-if="!signupDataForm.password.isValidate"
      >password required</div>
    </div>
    <!-- DATE -->
    <div class="data-field">
      <div class="input-container">
        <input
          type="date"
          placeholder="Password"
          v-model.trim="signupDataForm.date.value"
          :class="{ 'input-error': !signupDataForm.date.isValidate }"
        >
        <CalendarDays
          class="calendar-days"
          :class="{ 'error': !signupDataForm.date.isValidate }"
        />
      </div>
    </div>

    <button class="custom-btn bg-green-500 hover:bg-green-700">Sign up</button>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Info, CalendarDays } from 'lucide-vue-next';

const signupDataForm = reactive({
  firstName: {
    value: '',
    isValidate: true,
  },
  lastName: {
    value: '',
    isValidate: true,
  },
  email: {
    value: '',
    isValidate: true,
  },
  password: {
    value: '',
    isValidate: true,
  },
  date: {
    value: '',
    isValidate: true,
  },
});

const validateForm = ref(true);

const checkValidationInput = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  validateForm.value = true;

  if (!signupDataForm.firstName.value) {
    signupDataForm.firstName.isValidate = false;
    validateForm.value = false;
  } else {
    signupDataForm.firstName.isValidate = true;
  }

  if (!signupDataForm.lastName.value) {
    signupDataForm.lastName.isValidate = false;
    validateForm.value = false;
  } else {
    signupDataForm.lastName.isValidate = true;
  }

  if (!emailRegex.test(signupDataForm.email.value)) {
    signupDataForm.email.isValidate = false;
    validateForm.value = false;
  } else {
    signupDataForm.email.isValidate = true;
  }

  if (!signupDataForm.password.value || signupDataForm.password.value.length < 6) {
    signupDataForm.password.isValidate = false;
    validateForm.value = false;
  } else {
    signupDataForm.password.isValidate = true;
  }

  if (!signupDataForm.date.value) {
    signupDataForm.date.isValidate = false;
    validateForm.value = false;
  } else {
    signupDataForm.date.isValidate = true;
  }
};

const submitSignupForm = async () => {
  checkValidationInput();
  if (!validateForm.value) return;
  validateForm.value = true;

  try {
    console.log({
      firstName: signupDataForm.firstName.value,
      lastName: signupDataForm.lastName.value,
      email: signupDataForm.email.value,
      password: signupDataForm.password.value,
      date: signupDataForm.date.value
    },);
  } catch (err) {
    console.log((err as { message: string; }));
  }
};
</script>

<style scoped lang="scss">
.calendar-days {
  color: var(--clr-blue2) !important;

  &.error {
    color: theme('colors.red.500') !important;
  }
}
</style>