import type { StateTree } from 'pinia';

interface Post extends StateTree {
  text: string;
  bgPost: string | null;
  images?: Array<string> | [];
}

type UserInfo = {
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
  gender: string;
  verified: boolean;
};

interface Posts extends Post {
  _id: string;
  user: UserInfo & string;
  comments: [];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type { Post, Posts };