<template>
  <form
    @submit.prevent="submitSignupForm()"
    class="grid gap-4"
  >
    <div class="grid gap-4 overflow-auto h-[308px] px-2 pt-1">
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
              @blur="clearValidity('firstName')"
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
              @blur="clearValidity('lastName')"
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
            @blur="clearValidity('email')"
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
            @blur="clearValidity('password')"
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
            @blur="clearValidity('date')"
          >
          <CalendarDays
            class="calendar-days"
            :class="{ 'error': !signupDataForm.date.isValidate }"
          />
        </div>
      </div>
      <!-- GENDER -->
      <div class="gender flex gap-4">
        <label
          for="male"
          tabindex="0"
          :class="{ 'input-error': !signupDataForm.gender.isValidate }"
          @blur="clearValidity('gender')"
        >
          <input
            type="radio"
            value="Male"
            name="gender"
            id="male"
            v-model="signupDataForm.gender.value"
          >
          <span></span>
          <p>Male</p>
        </label>
        <label
          for="female"
          tabindex="0"
          :class="{ 'input-error': !signupDataForm.gender.isValidate }"
          @blur="clearValidity('gender')"
        >
          <input
            type="radio"
            value="Female"
            name="gender"
            id="female"
            v-model="signupDataForm.gender.value"
          >
          <span></span>
          <p>Female</p>
        </label>
      </div>
    </div>
    <button class="custom-btn bg-green-500 hover:bg-green-700">Sign up</button>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
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
  gender: {
    value: '',
    isValidate: true,
  },
});

const validateForm = ref(true);

const clearValidity = (input: string) => {
  type ElementKey = { [key: string]: { isValidate: boolean; }; };
  (signupDataForm as ElementKey)[input].isValidate = true;
};

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

  if (!signupDataForm.gender.value) {
    signupDataForm.gender.isValidate = false;
    validateForm.value = false;
  } else {
    signupDataForm.gender.isValidate = true;
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
      date: signupDataForm.date.value,
      gender: signupDataForm.gender.value,
    },);
  } catch (err) {
    console.log((err as { message: string; }));
  }
};

onMounted(() => {
  const handleEnterKey = (e: KeyboardEvent) => {
    const focusedElement = document.activeElement as HTMLElement;

    if (e && e.key === 'Enter') {
      if (!(focusedElement && focusedElement.tagName.toLowerCase() === 'label')) return;
      const genderInput = focusedElement.querySelector('[type="radio"]') as HTMLInputElement;
      genderInput.checked = true;
      signupDataForm.gender.value = genderInput.value;
    }

  };

  document.addEventListener('keydown', handleEnterKey);
});
</script>

<style scoped lang="scss">
.calendar-days {
  color: var(--clr-blue2) !important;

  &.error {
    color: theme('colors.red.500') !important;
  }
}

// GENDER
.gender {
  label {
    @apply flex-1 flex gap-2 items-center bg-white px-4 h-[48px] rounded-md cursor-pointer bg-opacity-50 border-2 border-third;

    &:focus {
      @apply outline-none border-blue2;
    }

    &.input-error {
      @apply border-red-500 bg-red-100;

      span {
        @apply border-red-500;
      }

      p {
        @apply text-red-500;
      }
    }

    input {
      @apply hidden;
    }

    span {
      @apply relative size-6 rounded-full border-blue2 border-2;

      &::before {
        @apply content-[''] absolute size-4 rounded-full bg-blue2 scale-0 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 transition-transform duration-300;
      }
    }

    input:checked ~ span::before {
      @apply scale-100;
    }

    input:checked ~ p {
      @apply text-blue2;
    }

    p {
      @apply font-semibold;
    }
  }
}
</style>