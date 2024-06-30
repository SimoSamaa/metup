import type { StateTree } from 'pinia';

interface loginPayload {
  email: string;
  password: string;
}

interface registerPayload extends loginPayload {
  firstName: string;
  lastName: string;
  date: string;
  gender: string;
}

interface User extends StateTree {
  id: string;
  token: string;
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
  verified: boolean;
}

export type { loginPayload, registerPayload, User };