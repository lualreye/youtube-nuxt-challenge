<script setup lang="ts">
import type { PropType } from 'vue';
import { ref, computed, defineProps, defineEmits, watch } from 'vue';

interface Rule {
  validate: (inputValue: string) => boolean;
  message: string;
}

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'inputErrors', 'input', 'input-errors']);

const props = defineProps({
  additionalLabel: {
    type: String,
    required: false,
    default: ''
  },
  prependContent: {
    type: String,
    required: false,
    default: ''
  },
  hideLabel: {
    type: Boolean,
    required: false,
    default: false
  },
  label: {
    type: String,
    required: true,
  },
  maxLength: {
    type: Number,
    required: false,
    default: undefined
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  },
  hint: {
    type: String,
    required: false,
    default: ''
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  validRules: {
    type: Array as PropType<Rule[]>,
    required: false,
    default: () => []
  },
  icon: {
    type: String,
    required: false,
    default: ''
  },
  modelValue: {
    type: String,
    required: false,
    default: ''
  },
  value: {
    type: String,
    required: false,
    default: ''
  },
});

const currentValue = ref('');
const ruleFailures = ref<string[]>([]);

const isValid = computed(() => ruleFailures.value.length === 0);
const validationClass = computed(() => (isValid.value ? 'valid' : 'invalid'));
const hasError = computed(() => ruleFailures.value.length > 0);
const ruleFailureMessage = computed(() => ruleFailures.value[0] || '');
const isFocused = ref(false);

const onInput = (event: any) => {
  const inputValue = event.target.value;
  currentValue.value = inputValue;

  if (props.modelValue !== null && props.modelValue !== undefined) {
    emit('update:modelValue', inputValue);
  } else {
    emit('input', inputValue);
  }
};

const onBlur = () => {
  isFocused.value = false;
  validateInput();
  emit('input-errors', ruleFailures.value);
  emit('blur');
};

const onFocus = () => {
  isFocused.value = true;
  resetValidation();
  emit('focus');
};

function validateInput() {
  const inputValue = currentValue.value;
  resetValidation();

  if (props.validRules.length > 0) {
    for (const rule of props.validRules) {
      if (typeof rule.validate === 'function' && !rule.validate(inputValue)) {
        ruleFailures.value.push(rule.message);
        break;
      }
    }
  }
}

const resetValidation = () => {
  ruleFailures.value = [];
};

watch(
  () => props.value,
  (newValue) => {
  currentValue.value = newValue;
});
</script>

<template>
  <div class="crush-text-field">
    <label :class="[validationClass, { 'error-label': hasError }]">
      <span
        v-if="!hideLabel"
        class="crush-text-field-label-text">
        {{ label }}
      </span>
      <span
        v-if="additionalLabel"
        class="additionalLabel">
        {{ additionalLabel }}
      </span>
      <div
      :class="[validationClass, { 'error-container': hasError, active: isFocused }]"
        class="input-container">
        <span
          v-if="prependContent"
          class="content">
          {{ prependContent }}
        </span>
        <input
          v-bind="$attrs"
          class="crush-text-field-input"
          ref="input"
          :maxlength="maxLength"
          :required="required"
          :value="currentValue"
          :aria-invalid="!isValid"
          :placeholder="placeholder"
          @blur="onBlur"
          @input="onInput"
          @focus="onFocus"
        />
        <slot name="icon">
          <i
            v-if="icon.length"
            :class="icon"
            class="content" />
        </slot>
      </div>
      <p
        v-if="hasError && !isFocused"
        role="alert"
        aria-live="polite"
        class="validation-error">
        {{ ruleFailureMessage }}
      </p>
      <div v-else>
        <p
          v-if="hint && isValid"
          class="hint">
          {{ hint }}
        </p>
      </div>
    </label>
  </div>
</template>

<style lang="scss" scoped>
$spacing-margin-padding: 8px;

.crush-text-field {
  margin-bottom: 1rem;

  .crush-text-field-label-text {
    display: block;
    font-weight: bold;
    color: $white;
    margin-bottom: 12px;
  }

  .additionalLabel {
    color: $white;
  }

  .input-container {
    display: flex;
    align-items: center;
    border: 1px solid $gray;
    border-radius: 8px;
    padding: $spacing-margin-padding;
    background-color: transparent;
    font-size: $body-font-small;

    &.active {
      border-color: $blue;
    }

    &.error-container {
      border-color: $red;
    }

    .content {
      margin-right: $spacing-margin-padding;
      color: $white;
    }

    .crush-text-field-input {
      flex-grow: 1;
      border: none;
      outline: none;
      color: $white;
      background-color: transparent;

      &::placeholder {
        color: $gray;
      }
    }
  }

  &.valid {
    border-color: $white;
  }

  &.invalid {
    border-color: $red;
  }

  &.error-label {
    color: $red;
  }

  .validation-error {
    color: $red;
    margin-top: $spacing-margin-padding;
  }

  .hint {
    color: $white;
    margin-top: $spacing-margin-padding;
  }
}
</style>
