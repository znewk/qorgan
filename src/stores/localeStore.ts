import { defineStore } from 'pinia';

// Хранилище для управления локалью
export const useLocaleStore = defineStore('locale', {
  state: () => ({
    // Начальный язык по умолчанию
    currentLocale: 'ru', // или 'kz'
  }),
  actions: {
    // Метод для изменения текущего языка
    setLocale(locale: 'ru' | 'kz') {
      this.currentLocale = locale;
      // Сохраняем значение в localStorage для долговременного хранения
      localStorage.setItem('app-locale', locale);
    },
  },
});
