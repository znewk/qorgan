<template>
    <main>
      <div class="container">
        <!-- <BaseHeader /> -->
        <SideBar active="6"/>
  
        <div class="content">
          <BaseHeader :title="$t('authorsLayout.title')"/>
          
          <AuthorsPage/>
  
          <BaseFooter />
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import BaseFooter from "@/components/common/BaseFooter.vue";
  import BaseHeader from "@/components/common/BaseHeader.vue";
  import AuthorsPage from "@/components/authors/AuthorsPage.vue"
  import SideBar from "@/components/cabinet/SideBar/SideBar.vue"
  import { useAuthStore } from '@/stores/authStore'
  import { Ref, ref, defineProps } from "vue";
  
  const AuthStore = useAuthStore()
  
  console.log(AuthStore.isLoggedIn)
  console.log(AuthStore.getCurrentUserRoles)
  
  
  
  let role: Ref<string | undefined> = ref(AuthStore.getCurrentUserRoles!)
  // defineProps
  
  // console.log(AuthStore.getCurrentUser)
  </script>
  
  
  <style scoped>
.container{
  display: flex;
  padding: 0 2% 0 7%;
}
  .content{
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  @media screen and (max-width: 1023px){
    .container{
      display: block;
      padding: 0 5%;
    }
  }
  </style>