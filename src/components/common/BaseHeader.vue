<template>
  <div class="header">
    <div class="routeBody">
      <!-- Используем $t для локализации -->
      <a href="/" class="route">{{ $t('header.home') }}</a>
      <span class="routeValue">
        {{ $t('header.route_separator') }}{{ title }}
      </span>
    </div>

    <div class="menu">
      <LocaleSwitcher/>

      <a class="user" href="/profile">
        <img src="/header/default.png" alt="user icon">
        <span class="username">{{ user?.fullName }}</span>
      </a>

      <div class="user" @click="AuthStore.logout()">
        <svg width="17" height="17" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg">
          <g opacity="1">
            <path d="M7.875 18.375H4.375C3.91087 18.375 3.46575 18.1906 3.13756 17.8624C2.80937 17.5342 2.625 17.0891 2.625 16.625V4.375C2.625 3.91087 3.46575 3.13756C3.46575 2.80937 3.91087 2.625 4.375 2.625H7.875" stroke="#718096" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 14.875L18.375 10.5L14 6.125" stroke="#718096" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.375 10.5H7.875" stroke="#718096" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
        </svg>
        
        <span class="username">{{ $t('header.logout') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import LoginButton from "@/components/common/LoginButton.vue";
import BaseLogo from "@/components/common/BaseLogo.vue";

import { useAuthStore } from '@/stores/authStore'
import { Ref, ref, defineProps } from "vue";
import { User } from "@/models/account";
import LocaleSwitcher from "./LocaleSwitcher.vue";

const AuthStore = useAuthStore()

const { title } = defineProps(['title']);
const user: Ref<User | null> = ref(AuthStore.getUserInfo)

const currentRoute = computed(() => {
  const router = useRouter();
  return router.currentRoute.value.path;
});
</script>

<style scoped>
.header{
  padding: 30px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.route{
  color: #A0AEC0;
  text-decoration: none;
}
.routeBody{
  font-size: 14px;
}
.user{
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
}
.username{
  color: #718096;
  font-family: "Inter Medium";
  margin-left: 10px;
}
.svg{
  cursor: pointer;
}
.menu{
  display: flex;
  align-items: center;
}
</style>
