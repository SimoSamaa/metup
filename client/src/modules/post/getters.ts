import type { Posts } from '@/types/postTypes';

export default {
  getPosts(state: { posts: Posts[]; }) {
    return state.posts;
  },
  getImages(state: { images: Array<string>; }) {
    return state.images;
  },
};