import { defineStore } from 'pinia';
import postActions from './actions';
import postGetters from './getters';
import type { Post, Posts } from '@/types/postTypes';

const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Posts[],
    images: [] as Array<string>,
    loading: false,
  }),
  actions: postActions,
  getters: postGetters,
});

export default usePostStore;