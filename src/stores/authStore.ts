import { defineStore } from "pinia";
import { ILoginInput, User } from "@/models/account";
import { api } from "@/services/api/AppApi";
import { useTokenStore } from "./tokenStore";
import router from "@/router";
import { useToast } from "vue-toastification";
import { i18n } from "@/main"; // Импортируем экземпляр i18n

const toast = useToast();

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null as User | null,
    refreshTokenTimeout: null as any,
  }),
  actions: {
    async login(creds: ILoginInput) {
      try {
        const response = await api.Account.loginByPassword(creds);
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error3'));
        } else {
          this.setUserData(response);
          router.push("/");
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async getCurrentUser() {
      try {
        const user = await api.Account.current();
        if (user && user.token) {
          this.setUserData(user);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async logout() {
      console.log('click')
      try {
        this.resetUserData();
        router.push("/login");
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async refreshToken() {
      this.stopRefreshTokenTimer();
      try {
        const user = await api.Account.refreshToken();
        const { setToken } = useTokenStore();
        setToken(user.token);
        this.startRefreshTokenTimer(user);
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    startRefreshTokenTimer(user: User) {
      this.stopRefreshTokenTimer();
      if (user.token) {
        console.log(user.token)
        const bytes = atob(user.token.split(".")[1]);
        const jwtToken = JSON.parse(bytes);
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - 60 * 1000;
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
      }
    },
    stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
    },
    getUserData() {
      const storedUser = window.localStorage.getItem('user')
      if(storedUser !== null ){
        const user = JSON.parse(storedUser) ;
        this.user = user;
      } else {
        this.user = null
      }
    },
    setUserData(user: User) {
      // const { setToken } = useTokenStore();
      // setToken(user.token);
      // this.user = user;
      // console.log('ssss: ')
      // console.table(this.user)
      // this.startRefreshTokenTimer(user);
      window.localStorage.setItem('user', JSON.stringify(user))
      this.user = user
      const tokenStore = useTokenStore();
      tokenStore.setToken(this.user.token)
    },
    authInitialize() {
      this.getUserData()
    },
    resetUserData() {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('token')
      this.user = null;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    getCurrentUserRoles: (state) => state.user?.roles[0],
    getUserInfo: (state) => state.user || null,
  },
});
