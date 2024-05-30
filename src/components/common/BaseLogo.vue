<template>
  <router-link
    to="/"
    class="d-flex align-items-center mb-2 mb-md-0 text-decoration-none text-white"
  >
    <h2 class="d-none d-lg-inline">{{ title.main }}</h2>
    <h2 class="d-lg-none">{{ title.short }}</h2>
  </router-link>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/appStore";

const { title } = storeToRefs(useAppStore());
</script>
