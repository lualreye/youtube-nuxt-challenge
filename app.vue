<script setup lang="ts">
</script>

<template>
  <div class="app-container">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.app-container {
  min-height: 100vh;
  width: 100%;
  background-color: $black;
}
</style>