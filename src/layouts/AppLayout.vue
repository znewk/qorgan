<script setup lang="ts">
import DefaultLayout from "./DefaultLayout.vue";
import { markRaw, ref, watch } from "vue";
import { useRoute } from "vue-router";

const layout = ref();
const route = useRoute();

watch(
  () => route.meta?.layout as string | undefined,
  async (metaLayout) => {
    try {
      const component =
        metaLayout && (await import(/* @vite-ignore */ `../layouts/${metaLayout}.vue`));
      layout.value = markRaw(component?.default || DefaultLayout);
    } catch (e) {
      layout.value = markRaw(DefaultLayout);
    }
  },
  { immediate: true }
);
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
