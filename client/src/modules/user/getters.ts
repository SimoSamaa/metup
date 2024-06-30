import type { User } from '@/types/userTypes';

export default {
  getUser(state: { user: User | null; }) {
    return state.user;
  }
};