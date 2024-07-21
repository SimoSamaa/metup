import type { StateTree } from 'pinia';

interface Post extends StateTree {
  id?: string;
  text: string;
  bgPost: string | null;
  images?: Array<string> | [];
}

export type { Post };