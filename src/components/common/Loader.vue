<template>
    <div class="loader">
        <img src="/loader.png" alt="loader" class="icon">
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
    .loader{
        height: 100%;
        padding: 50px 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon{
        height: 64px;
        width: 64px;
        animation: rotate 1s infinite;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        95% {
            transform: rotate(360deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>