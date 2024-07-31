import type { Posts } from '@/types/postTypes';

export default {
  getPosts(state: { posts: Posts[]; }) {
    return state.posts;
  },
  getImages(state: { images: Array<string>; }) {
    return state.images;
  },
  checkIfIsPosts(state: { posts: Posts[]; }) {
    return state.posts && state.posts.length === 0;
  }
};