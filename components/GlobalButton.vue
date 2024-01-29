<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: false,
  },
  isButtonDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  variant: {
    type: String,
    required: false,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  dataLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  small: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const variants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  ALERT: 'alert',
  TEXT_ONLY: 'textonly',
};

const variantClass = computed(() => {
  switch (props.variant) {
    case variants.PRIMARY:
      return 'primary';
    case variants.SECONDARY:
      return 'secondary';
    case variants.TERTIARY:
      return 'tertiary';
    case variants.TEXT_ONLY:
      return 'text-only';
    case variants.ALERT:
      return 'alert';
    default:
      return 'primary';
  }
});

const loading = computed(
  () => props.dataLoading && props.variant !== variants.TEXT_ONLY
);

const buttonDisabled = computed(
  () =>
    (props.dataLoading && props.variant === variants.TEXT_ONLY) ||
    props.disabled
);

const buttonSizeClass = computed(() => {
  return props.small ? 'button-small' : '';
});
</script>

<template>
  <button
    class="button"
    :class="[{ disabled: buttonDisabled }, variantClass, buttonSizeClass, { isLoading: loading }]"
    :disabled="buttonDisabled">

    <slot v-if="!loading">
      {{ text }}
    </slot>
    <slot v-else>
      <span class="text-loading">
        {{ text }}     
      </span>
    </slot>

    <Transition>
      <div v-if="loading" class="spinner-wrapper">
        <div class="spinner"></div>
      </div>
    </Transition>
  </button>
</template>

<style lang="scss" scoped>
// @import '@nabux-crush/styles/nabuxInternalVariables';

// Variables
$button-border-radius: 8px;
$button-horizontal-padding: 16px;
$button-vertical-padding: 12px;
$button-small-horizontal-padding: 12px;
$button-small-vertical-padding: 6px;

.button {
  //default styles
  position: relative;
  // spacing
  border-radius: $button-border-radius;
  padding: $button-vertical-padding $button-horizontal-padding;
  //Typography
  font-family: $base-font;
  font-weight: $font-weight-bold;
  color: $white;
  font-size: $body-font-size;
  position: relative;
  z-index: 20;
  cursor: pointer;


  // Size
  &-small {
    padding: $button-small-vertical-padding $button-small-horizontal-padding;
  }

  // Disabled
  &.disabled {
    cursor: not-allowed;
    background-color: $disabled-button;
    color: $white;
    border: 1px solid $disabled-button;
  }

  .text-loading {
    position: relative;
    z-index: 10;
  }
  // Spinner
  .spinner-wrapper {
    // Loading wrapper
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $primary-button-hover;
    border: 1px solid $gray;
    border-radius: 8px;
    background-color: $gray;
    .spinner {
      // Loading Spinner
      width: 15px;
      height: 15px;
      border: 2px solid $gray-light;
      border-top-color: $gray;
      border-radius: 100%;
      animation: spinner-rotate 1s infinite linear;
    }
  }
}

// Crush button container on loading
.isLoading {
  position: relative;
  padding: 12px 16px;
  background-color: none;
  border: none;
}

// Button Variants
.primary {
  background-color: $primary-button;
  border: 1px solid $primary-button;
  &:hover {
    background-color: $primary-button-hover;
    border: 1px solid $primary-button-hover;
  }
}
.secondary {
  background-color: $secondary-button;
  border: 1px solid $secondary-button;
  color: $white;
  &:hover {
    background-color: $secondary-button;
    border: 1px solid $secondary-button-hover;
  }
}
.text-only {
  background-color: none;
  border: none;
  color: $primary-button;
  &:hover {
    background-color: none;
    color: $primary-button-hover;
  }
}

// Animations
@keyframes spinner-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
