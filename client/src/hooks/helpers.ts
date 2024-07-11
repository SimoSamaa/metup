import { computed } from 'vue';

const useHelpers = () => {

  const usePath = computed<Function>(() => {
    return (path: string) => {
      const basePath = new URL(import.meta.url).origin;
      return `${basePath}/src/${path}`;
    };
  });

  return { usePath };
};

export default useHelpers;