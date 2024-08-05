import { computed, nextTick, watch, type Ref } from 'vue';

const useHelpers = () => {

  const usePath = computed<Function>(() => {
    return (path: string) => {
      const basePath = new URL(import.meta.url).origin;
      return `${basePath}/src/${path}`;
    };
  });

  const useHideScroll = (state: Ref<boolean>) => {
    const handleScrollBarPopupForm = (payload: boolean) => {
      nextTick(() => {
        document.body.style.overflow = payload ? 'hidden' : 'auto';
      });
    };

    watch(state, (newValue) => {
      handleScrollBarPopupForm(newValue);
    }, { immediate: true });
  };

  return { usePath, useHideScroll };
};

export default useHelpers;
