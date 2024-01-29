<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import useUserStore from '~/store/auth';

const userStore = useUserStore();

const router = useRouter();

const showLogoutButton = ref(false);
const user = computed(() => userStore.user);
const userInitial = computed(() => {
  if (user && user.value?.email) {
    return user.value?.email.charAt(0).toUpperCase();
  }
  return '';
});

function redirectTo(param: string) {
  router.push(`/${param}`)
}
function logout() {
  userStore.logoutUser();
  router.push('/');
}
</script>


<template>
  <header class="youtube-header">

    <NuxtLink
      to="/"
      class="youtube-header-logo">
      YT
    </NuxtLink>

    <div class="youtube-header-user-content">
      <template v-if="user">
        <div class="youtube-header-profile">
          <img
            v-if="user?.photoUrl"
            :src="user.photoUrl"
            alt="Profile picture">
          <span v-else>
            {{ userInitial }}
          </span>
        </div>
        <div 
          class="user-actions">
          <span
            class="youtube-header-username">
            {{ user?.displayName || user.email }}
          </span>
          <GlobalButton
            text="Cerrar sesión"
            variant="secondary"
            @click="logout"
            class="logout-button"
          />
        </div>
      </template>
      <div
        v-else
        class="youtube-header-user-content-actions">
        <GlobalButton
          text="Iniciar sesión"
          variant="primary"
          @click="redirectTo('login')" />
        <GlobalButton
          text="Registrarse"
          variant="secondary"
          @click="redirectTo('register')" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.youtube-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: $black;

  &-logo {
    font-size: 2rem;
    color: red;
    font-family: $base-font;
  }

  &-user-content {
    display: flex;
    align-items: center;
    &-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }

  &-profile {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }

    span {
      font-size: 1.5rem;
      color: #333;
    }
  }

  &-username {
    margin-left: 10px;
  }

}

.user-actions {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .logout-button {
    top: 120%;
    left: 0;
    position: absolute;
    visibility: hidden;
    transition: visibility 3s linear;
  }
  &:hover .logout-button {
    visibility: visible;
  }
}
</style>
