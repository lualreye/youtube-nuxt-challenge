<script setup lang="ts">
import useUserStore from '../store/auth';
import { useForm } from '../composables/useForms';

const { userData, userRules, enableForm, passwordIcon, textType, isPasswordVisible, resetValue, textKey } = useForm();
const userStore = useUserStore();

function handleLogin() {
  userStore.loginUser(userData.user, userData.password);
  resetValue();
}
</script>

<template>
  <div class="register-wrapper crush-container">
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
        text="Registro"
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
  min-height: 100vh;
  &-card {
    background: $purple-dark;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 360px;
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