<script setup lang="ts">
import { onMounted } from 'vue';

import useUserStore from '../store/auth';

const userStore = useUserStore();

onMounted(() => {
  if (!userStore.user) {
    userStore.currentUser();
  }
})
</script>

<template>
  <div class="container">
    <GlobalHeader />
    <div class="content">
      <slot  />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  background-color: $black;
  display: flex;
  flex-direction: column;
  .content {
    margin: 0 auto;
    max-width: 1440px;
    width: 100%;
  }
}
</style>