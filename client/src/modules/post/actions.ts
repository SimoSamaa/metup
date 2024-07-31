import handleRequest from '@/hooks/handleRequest';
import type { Post, Posts } from '@/types/postTypes';
import useAuthStore from '@/modules/auth/index';

export default {
  async createPost(this: { posts: Posts[]; }, post: Post) {
    const authStore = useAuthStore();
    const token = authStore.token;
    const user = authStore.userId;

    const res = await handleRequest<{ message: string; }, Post>('add-post', 'POST', { user, ...post }, token);
    console.log('from action', res);


    this.posts.unshift((res as unknown as Posts));

    return res.message;
  },
  async uploadImages(this: { images: Array<string>; }, payload: { path: string; blobImages: Blob[]; }) {
    const authStore = useAuthStore();
    const token = authStore.token;
    const formData = new FormData();

    formData.append('path', payload.path);
    payload.blobImages.forEach((img: Blob) => formData.append('file', img));

    const res = await handleRequest<{ message: string; images: Array<string>; }, FormData>('upload-images', 'POST', formData, token);

    this.images = res.images;

    return res.message;
  },
  async fetchPosts(this: { posts: Posts[]; loading: boolean; }) {
    const authStore = useAuthStore();
    const token = authStore.token;

    this.loading = true;

    const res = await handleRequest<Posts[], null>('getAllPosts', 'GET', null, token);
    this.posts = res;

    this.loading = false;

  }
};
