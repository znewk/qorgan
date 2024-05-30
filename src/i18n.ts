import { createI18n } from "vue-i18n";
import ru from "./locales/ru.json";
import kz from "./locales/kz.json";

// Получаем язык из localStorage, если он там есть, иначе используем значение по умолчанию
const savedLanguage = localStorage.getItem('language') as "kz" | "ru" || 'kz';

const i18n = createI18n({
  legacy: false,
  locale: savedLanguage,
  fallbackLocale: savedLanguage,
  messages: {
    ru,
    kz,
  },
});

// Геттер для текущего языка
export const getCurrentLanguage = () => i18n.global.locale.value;

// Сеттер для установки языка и сохранения его в localStorage
export const setCurrentLanguage = (newLocale: "kz" | "ru") => {
  i18n.global.locale.value = newLocale;
  localStorage.setItem('language', newLocale);
};

export default i18n;
