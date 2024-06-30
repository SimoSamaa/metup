import type { AuthState, User } from '@/types/userTypes';
import useAuthStore from '../auth/index';
import handleRequest from '@/hooks/handleRequest';


export default {
  async fetchUser(this: { user: User | null; }) {
    const token: AuthState['token'] = useAuthStore().token;
    const userId: AuthState['userId'] = useAuthStore().userId;
    const res = await handleRequest<User, null>(`user/${userId}`, 'GET', null);
    this.user = res;
  }
};