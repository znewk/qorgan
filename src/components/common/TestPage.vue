<template>
  <div
    class="container d-flex flex-wrap align-items-center justify-content-center text-center"
  >
    <div style="margin: auto">
      <h1>{{ title }}</h1>
      <h2>{{ subtitle }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
});
</script>
