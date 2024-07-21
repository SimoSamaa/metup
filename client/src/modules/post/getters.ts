import type { Post } from '@/types/postTypes';

export default {
  getPosts(state: { posts: Post[]; }) {
    return state.posts;
  },
  getImages(state: { images: Array<string>; }) {
    return state.images;
  },
};