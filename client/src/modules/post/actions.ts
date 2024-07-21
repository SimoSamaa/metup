import handleRequest from '@/hooks/handleRequest';
import type { Post } from '@/types/postTypes';
import useAuthStore from '@/modules/auth/index';

export default {
  async createPost(this: { posts: Post[]; }, post: Post) {
    const authStore = useAuthStore();
    const token = authStore.token;
    const user = authStore.userId;

    const res = await handleRequest<{ message: string; }, Post>('add-post', 'POST', { user, ...post }, token);

    this.posts.push(post);

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
  }
};