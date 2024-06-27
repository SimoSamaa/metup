<template>
  <div
    :class="['navigation-search py-2 flex gap-2 relative w-[calc(300px+0.5rem)]', { 'search-container-sm': focusSearch }]"
  >
    <button
      v-if="Boolean(!focusSearch)"
      @click="$router.push({ name: 'home' })"
    >
      <img
        class="max-w-10"
        src="@/assets/logo-2D.png"
        alt="logo"
      >
    </button>

    <div class="flex gap-2 w-full pr-4">
      <button
        v-if="Boolean(focusSearch)"
        class="hover:bg-w2 self-center cursor-pointer size-[36px] rounded-full grid place-content-center"
      >
        <ArrowLeft :size="20" />
      </button>
      <!-- SEARCH FIELD -->
      <div :class="['search-field search-field-sm one-ele relative [&_svg]:w-[20px]']">
        <input
          type="text"
          placeholder="Search Metup"
          v-model="inputSearch"
          @input="focusSearch = true"
          class="one-ele placeholder:text-inherit bg-w2 rounded-full pr-4 pl-9 focus:pl-4 outline-none border border-third transition-all duration-200 ease-in-out w-full h-[40px]"
        >
        <Search class="search pointer-events-none absolute left-2 top-1/2 -translate-y-1/2" />
        <X
          v-if="Boolean(!!inputSearch)"
          @click="String(inputSearch = '')"
          class="one-ele absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        />
      </div>
      <!-- SEARCH LIST -->
      <div
        v-if="Boolean(focusSearch)"
        class="one-ele -z-10 top-0 -left-4 absolute w-[calc(100%+1rem)] min-h-[100px] pt-[60px] bg-w1 shadow-xl rounded-b-lg"
      >
        <div v-if="false">
          <div class="one-ele flex justify-between p-4">
            <p class="one-ele font-semibold">Recent</p>
            <span class="one-ele text-blue-500">Edit</span>
          </div>
          <ul class="one-ele p-4">
            <li>one element</li>
          </ul>
        </div>
        <p
          v-else
          class="one-ele flex items-center justify-center gap-2 p-4 text-center font-semibold"
        >No recent searches
          <History :size="20" />
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Search, X, ArrowLeft, History } from 'lucide-vue-next';

const focusSearch = ref(false);
const inputSearch = ref('');

const matchesSearchElement = (e: Event) => {
  const elementTarget = (e.target as HTMLElement);
  const matchesElement = elementTarget.matches('.one-ele');
  const searchField = document.querySelector('.search-field') as HTMLElement;

  if (matchesElement) {
    searchField.classList.remove('search-field-sm');
    focusSearch.value = true;
  } else {
    searchField.classList.add('search-field-sm');
    focusSearch.value = false;
    inputSearch.value = '';
  }
};

onMounted(() => {
  document.addEventListener('click', matchesSearchElement);
});
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixins";

.navigation-search {
  @include breakpoint('sm') {
    &.search-container-sm {
      @apply absolute w-[calc(100%-1rem)] z-50;

      .search-field {
        @apply flex-1;
      }
    }
  }

  .search-field {
    @include breakpoint('md') {
      &.search-field-sm {
        @apply size-[40px] bg-w2 rounded-full cursor-pointer hover:bg-third;

        input {
          @apply hidden;
        }
      }
    }

    input:focus ~ .search {
      @apply hidden;
    }
  }
}
</style>