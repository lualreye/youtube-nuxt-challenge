import { reactive, computed, ref } from 'vue';
import { validateEmail } from '../utils/AuthValidations.utils';

export function useForm() {
  const textKey = ref(0);
  const isPasswordVisible = ref(false);
  const userData = reactive({
    user: '',
    password: ''
  });
  const userRules = {
    emailValidation: [
      {
        validate: (value: string) => validateEmail(value),
        message: 'Ingresa un correo válido' 
      },
      {
        validate: (value: string) => value.length > 0,
        message: 'Ingresa un correo'
      }
    ],
    passwordValidation: [
      {
        validate: (value: string) => value.length > 10,
        message: 'El password debe tener al menos 10 caracteres' 
      }
    ]
  };

  const enableForm = computed(() => {
    return userData.user !== '' &&
      userData.password !== '' &&
      userRules.emailValidation.every((rule) => rule.validate(userData.user)) &&
      userRules.passwordValidation.every((rule) => rule.validate(userData.password))
  });

  const passwordIcon = computed(() => {
    return isPasswordVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
  });

  const textType = computed(() => {
    return isPasswordVisible.value ? 'text' : 'password'
  });

  function resetValue() {
    userData.user = '';
    userData.password = '';
    textKey.value++;
  }

  return { userData, userRules, enableForm, passwordIcon, textType, isPasswordVisible, resetValue, textKey };
}