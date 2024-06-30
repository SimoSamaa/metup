import type { registerPayload, loginPayload, User } from '@/types/userTypes';
import handleRequest from '@/hooks/handleRequest';

export default {
  async register(payload: registerPayload) {
    const registerData = {
      ...payload,
      bYear: new Date(payload.date).getFullYear(),
      bMonth: new Date(payload.date).getMonth() + 1,
      bDay: new Date(payload.date).getDate(),
    };

    await handleRequest<User, registerPayload>('register', 'POST', registerData);
  },
  async login(this: { user: User; }, payload: loginPayload) {
    const res = await handleRequest<User, loginPayload>('login', 'POST', payload);

    localStorage.setItem('user', JSON.stringify(res));

    this.user = res;
  },
  // tryLogin(this: AuthState) {
  //   const token: string = localStorage['token'];
  //   const userId: string = localStorage['userId'];

  //   if (token && userId) {
  //     this.token = token;
  //     this.userId = userId;
  //   } else {
  //     this.token = null;
  //     this.userId = null;
  //   }
  // },
  async logout(this: User) {
    this.user = {};

    localStorage.removeItem('user');
  }
};