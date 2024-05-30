<template>
  <span class="text" @click="switchLanguage">
    <img src="/header/locale.png" style="height: 12px; width: 12px;">
    <span style="line-height: 6px; margin-left: 10px;">
      {{ currentLanguageName }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { getCurrentLanguage, setCurrentLanguage } from '@/i18n'; // Подставьте правильный путь к вашему i18n
import { Ref, ref } from 'vue';

const locales = [
  { name: 'Русский', code: 'ru' },
  { name: 'Қазақша', code: 'kz' },
];

const currentLanguageName: Ref<any> = ref(locales.find(locale => locale.code === getCurrentLanguage())?.name);

const switchLanguage = () => {
  const currentLocale = getCurrentLanguage();
  const currentIndex = locales.findIndex(locale => locale.code === currentLocale);
  const nextIndex = (currentIndex + 1) % locales.length;
  const nextLocale: "ru" | "kz" = locales[nextIndex].code as "ru" | "kz";
  setCurrentLanguage(nextLocale);
  if(nextLocale == 'kz'){
    currentLanguageName.value = "Қазақша";
  } else {
    currentLanguageName.value = "Русский";
  }
  
};
</script>

<style scoped>
.text {
  color: #718096;
  cursor: pointer;
  font-family: "Inter Medium";
  display: flex;
  align-items: center;
}
</style>
