import { defineStore } from 'pinia';
import authActions from './actions';
import authGetters from './getters';
import type { User } from '@/types/userTypes';

const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User,
  }),
  actions: authActions,
  getters: authGetters,
});

export default useUserStore;