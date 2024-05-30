import { defineStore } from "pinia";

export const useTokenStore = defineStore({
  id: "token",
  state: () => ({
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    setToken(token: string | null) {
      window.localStorage.setItem('token', JSON.stringify(token))
      this.token = token;
    },
    getToken() {
      return window.localStorage.getItem("token");
    },
  },
});
