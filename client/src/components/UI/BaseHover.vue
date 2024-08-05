<template>
  <div
    id="hover-title-element"
    class="absolute left-1/2 -translate-x-1/2 text-w1 px-3 py-2 max-[950px]:hidden rounded-md bg-black bg-opacity-50 opacity-0 scale-0 duration-300 ease-in-out transition-all z-20 min-w-max first-letter:capitalize"
  >
    {{ title }}
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

defineProps({
  title: {
    type: String as PropType<string>,
    required: true,
  },
  bottom: {
    type: String as PropType<string>,
    default: '-50px',
  },
  left: {
    type: String as PropType<string>,
    default: '50%',
  },
});
</script>

<style lang="scss">
$classes: (
  'button',
  'nav ul li a',
  '.user-actions button',
  '.right-side',
  '.emoji',
  '.time-ago',
  '.post-showing',
  '.verified-badge',
  'baseHover-group',
);

#hover-title-element {
  bottom: v-bind(bottom);
  left: v-bind(left);
}

@each $class in $classes {
  #{$class}:is(:hover, :focus-visible) #hover-title-element:not(:hover) {
    @apply opacity-100 scale-100;
  }

  .router-link-active:hover #hover-title-element:not(:hover) {
    @apply opacity-0 scale-0;
  }
}
</style>