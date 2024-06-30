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
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
  verified: boolean;
}

interface userWitheToken extends User { token: string; }

interface AuthState extends StateTree {
  token: string | null;
  userId: string | null;
}

export type { loginPayload, registerPayload, AuthState, User, userWitheToken };