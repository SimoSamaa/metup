import type { User } from '@/types/userTypes';

export default {
  getUser(state: { user: User | null; }) {
    return state.user;
  },
  isAuth(state: { user: User | null; }) {
    return !!state?.user && !!state.user?.token;
  },
  token(state: { user: User; }) {
    return state.user?.token ?? null;
  },
  userId(state: { user: User; }) {
    return state.user?.id ?? null;
  }
};