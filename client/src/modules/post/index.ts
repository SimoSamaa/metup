import { defineStore } from 'pinia';
import postActions from './actions';
import postGetters from './getters';
import type { Post } from '@/types/postTypes';

const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    images: [] as Array<string>,
  }),
  actions: postActions,
  getters: postGetters,
});

export default usePostStore;