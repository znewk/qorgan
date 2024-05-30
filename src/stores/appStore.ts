import { ServerError } from "@/models/server";
import { defineStore } from "pinia";


export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    appLoaded: false,
    error: null as ServerError | null,
    title: {
      main: "Шаблон корпоративного приложения",
      short: "FE-EE",
      icon: "",
    },
    footer: {
      text: "ТОО ИННОВАЦИОННАЯ КОМПАНИЯ TM-SYSTEMS",
      copyright: new Date().getFullYear(),
      href: "https:///www.tm-systems.kz",
      bg: "/src/assets/img/footer-bg.jpg",
    },
    notification: {
      title: "Уведомление | Notification",
      text: "",
      show: false,
    },
  }),
  actions: {
    initialize() {
      console.log(`Application started - ${new Date()}`);
      // AuthStore.authInitialize()
    },
    setServerError(error: ServerError) {},
  },
  getters: {},
});
