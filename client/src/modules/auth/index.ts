import { defineStore } from 'pinia';
import authActions from './actions';
import authGetters from './getters';

const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    userId: null,
  }),
  actions: authActions,
  getters: authGetters,
});

export default useAuthStore;