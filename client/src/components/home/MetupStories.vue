<template>
  <main class="grid relative overflow-x-hidden">
    <button
      @click="handleScrollAction(-149)"
      :class="['not-allowed left-[-48px] opacity-0', { 'left-[20px] opacity-100': actionLeft }]"
    >
      <ChevronLeft />
    </button>
    <ul
      @scroll="storiesScroll()"
      ref="storiesContainer"
      class="flex gap-2 overflow-x-auto"
    >
      <li>
        <router-link
          to="/stories/create"
          class="flex flex-col"
        >
          <div class="flex-1 overflow-hidden">
            <img
              src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
              alt="default-story-pic"
            >
          </div>
          <div class="relative pb-3 pt-7">
            <span
              class="absolute -top-[20px] size-[44px] left-1/2 -translate-x-1/2 bg-blue2 rounded-full grid place-content-center stroke-white-4 text-white border-[5px] border-w1"
            >
              <Plus
                :size="20"
                stroke-width="3"
              />
            </span>
            <p class="text-center font-semibold text-black">Create story</p>
          </div>
        </router-link>
      </li>
      <li
        v-for="(box, ind) in boxes"
        :key="ind"
      >
        <router-link
          class="relative p-4 flex flex-col justify-between"
          to="/"
        >
          <div class="size-[48px] rounded-full overflow-hidden border-blue2 border-4">
            <img
              src="@/assets/stories/profile2.jpg"
              alt="user-pic"
            >
          </div>
          <p class="font-semibold text-white capitalize">mohamed</p>
          <div class="absolute inset-0 -z-10">
            <img
              src="@/assets/stories/1.jpg"
              alt="story-pic"
            >
          </div>
        </router-link>
      </li>
    </ul>
    <button
      :class="['not-allowed right-[-48px] opacity-0', { 'right-[20px] opacity-100': actionRight }]"
      @click="handleScrollAction(149)"
    >
      <ChevronRight />
    </button>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-vue-next';

const storiesContainer = ref<HTMLElement | null>(null);
const actionLeft = ref(false);
const actionRight = ref(false);
const boxes = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const handleScrollAction = (val: number) => {
  (storiesContainer.value as HTMLElement).scrollBy({
    left: val,
    behavior: 'smooth',
  });
};

const storiesScroll = () => {
  const ele = (storiesContainer.value as HTMLElement);
  const eleScrollWidth = ele.scrollWidth;
  const eleClientWidth = ele.clientWidth;
  const eleScrollLeft = ele.scrollLeft;

  actionLeft.value = eleScrollLeft > 0;
  actionRight.value = eleScrollWidth > eleClientWidth;
  if (eleClientWidth + Math.ceil(+eleScrollLeft.toString()) === eleScrollWidth) actionRight.value = false;
  // console.log(eleScrollWidth, eleClientWidth, eleScrollLeft);
};

onMounted(() => {
  storiesScroll();
});
</script>

<style lang="scss" scoped>
main {
  ul::-webkit-scrollbar {
    @apply hidden;
  }

  ul li {
    @apply min-w-[141px] h-[250px] bg-w1 shadow-md rounded-lg overflow-hidden scale-[.9];

    a {
      @apply relative;

      &::before {
        @apply content-[''] absolute inset-0 bg-black opacity-0 z-10 duration-300 transition-opacity ease-out hover:opacity-20;
      }

      div img {
        @apply object-cover duration-300 transition-transform ease-out;
      }

      &:hover div img:not([alt="user-pic"]) {
        @apply scale-105;
      }
    }
  }

  button {
    @apply absolute size-[40px] rounded-full bg-blue2 grid place-content-center top-1/2 -translate-y-1/2 z-20 text-white hover:bg-blue-700 duration-300 transition-all ease-out active:scale-95 active:bg-blue-800;
  }
}
</style>