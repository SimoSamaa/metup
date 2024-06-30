import type { AuthState } from '@/types/userTypes';

export default {
  getUserId(state: { userId: AuthState['userId']; }): string {
    return state.userId ?? '';
  },
  getToken(state: { token: AuthState['token']; }): string {
    return state.token ?? '';
  },
  isAuth(state: { token: AuthState['token']; }): boolean {
    return !!state.token;
  },
};
