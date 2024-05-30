<template>
  <footer
    class="footer"
  >
    <a
      :href="footer.href"
      class="link"
    >
      <h5>
        &copy; {{ footer.copyright }} - <strong>{{ footer.text }}</strong>
      </h5>
    </a>
    <!-- Перевод (демо) - {{ $t("message") }} -->
  </footer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/appStore";

const { footer } = storeToRefs(useAppStore());
</script>
<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.link{
  color: black;
  text-decoration: none;
}
</style>
