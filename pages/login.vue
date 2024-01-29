<script setup lang="ts">
import { useRouter } from 'vue-router';

import useUserStore from '../store/auth';
import { useForm } from '../composables/useForms';

const router = useRouter();

const userStore = useUserStore();

const { userData, userRules, enableForm, passwordIcon, textType, isPasswordVisible, resetValue, textKey } = useForm();

function clearErroMessage(): void {
  setTimeout(() => {
    userStore.errorMessage = null;
  }, 5000);
}

async function handleLogin(): Promise<void> {
  await userStore.loginUser(userData.user, userData.password);
  if (userStore.user) {
    resetValue();
    router.push('/');
  }
  clearErroMessage()
}
</script>

<template>
  <div class="register-wrapper crush-container">
    <h2>
      Iniciar sesión
    </h2>
    <div v-if="userStore.errorMessage" class="error-message">
      {{ userStore.errorMessage }}
    </div>
    <div class="register-wrapper-card">
      <GlobalInput
        :key="textKey"
        v-model="userData.user"
        label="Usuario"
        :validRules="userRules.emailValidation" />
      <GlobalInput
        :key="textKey"
        v-model.trim="userData.password"
        label="Password"
        :type="textType"
        :validRules="userRules.passwordValidation">
        <template #icon>
          <button
            class="icon-button"
            @click="isPasswordVisible = !isPasswordVisible">
            <i :class="passwordIcon" />
          </button>
        </template>
      </GlobalInput>
      <GlobalButton
        variant="primary"
        text="Inicia sesion"
        :dataLoading="userStore.isLoading"
        :disabled="!enableForm"
        @click.prevent="handleLogin" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-wrapper {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  min-height: 100vh;
  .error-message {
    color: $red;
  }
  &-card {
    background: $black;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 360px;
    border: 1px solid $gray;
    border-radius: 8px;
    padding: 16px;
    .hoot-text-field {
      :first-child {
        margin-bottom: 8px;
      }
    }
    .icon-button {
      background-color: transparent;
      color: $white;
      border: none;
    }
    .crush-button {
      margin-top: 12px;
    }
  }
}
</style>