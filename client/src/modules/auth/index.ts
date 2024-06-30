import { defineStore } from 'pinia';
import authActions from './actions';
import authGetters from './getters';
import type { User } from '@/types/userTypes';

const parseUser = (user: User | {} = {}) => {
  const userString = localStorage['user'];
  if (userString) user = JSON.parse(userString);
  return user;
};

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: parseUser() as User,
  }),
  actions: authActions,
  getters: authGetters,
});

export default useAuthStore;