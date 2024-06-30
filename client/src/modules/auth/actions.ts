import type { registerPayload, loginPayload, AuthState, userWitheToken } from '@/types/userTypes';
import handleRequest from '@/hooks/handleRequest';

export default {
  async register(this: AuthState, payload: registerPayload) {
    const registerData = {
      ...payload,
      bYear: new Date(payload.date).getFullYear(),
      bMonth: new Date(payload.date).getMonth() + 1,
      bDay: new Date(payload.date).getDate(),
    };

    const res = await handleRequest<userWitheToken, registerPayload>('register', 'POST', registerData);

    this.token = res.token;
    this.userId = res.id;
  },
  async login(this: AuthState, payload: loginPayload) {
    const res = await handleRequest<userWitheToken, loginPayload>('login', 'POST', payload);

    localStorage.setItem('token', res.token);
    localStorage.setItem('userId', res.id);

    this.token = res.token;
    this.userId = res.id;
  },
  tryLogin(this: AuthState) {
    const token: string = localStorage['token'];
    const userId: string = localStorage['userId'];

    if (token && userId) {
      this.token = token;
      this.userId = userId;
    } else {
      this.token = null;
      this.userId = null;
    }
  },
  async logout(this: AuthState) {
    this.token = null;
    this.userId = null;

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
};