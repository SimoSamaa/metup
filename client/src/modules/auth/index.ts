import { defineStore } from 'pinia';
import authActions from './actions';
import authGetters from './getters';
import type { AuthState } from '@/types/userTypes';

const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage['token'] ?? null as AuthState['token'],
    userId: localStorage['userId'] ?? null as AuthState['userId'],
  }),
  actions: authActions,
  getters: authGetters,
});

export default useAuthStore;