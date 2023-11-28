<template>
  <button
    plain
    :hover-class="`${props.type}-button-hover`"
    :class="[`${props.type}-button`, `${props.size}-button`]"
    class="hx-pt-[13px] hx-pb-[13px] hx-font-bold"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  type: {
    type: String as PropType<'primary' | 'warning' | 'error' | 'success'>,
    default: 'primary'
  },
  size: {
    type: String as PropType<'large' | 'medium' | 'small'>,
    default: 'medium'
  }
});
const emits = defineEmits(['click']);

const handleClick = () => {
  emits('click');
};
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
};
</script>

<style scoped>
.large-button {
  height: 44px;
  font-size: 16px;
  line-height: 16px;
}

.medium-button {
  height: 40px;
  font-size: 14px;
  line-height: 14px;
}

.small-button {
  height: 36px;
  font-size: 12px;
  line-height: 12px;
}

.primary-button {
  background-color: var(--hx-color-primary);
}

.primary-button-hover {
  background-color: var(--hx-color-primary-hover);
}

.success-button {
  background-color: var(--hx-color-success);
}

.success-button-hover {
  background-color: var(--hx-color-success-hover);
}

.warning-button {
  background-color: var(--hx-color-warning);
}

.warning-button-hover {
  background-color: var(--hx-color-warning-hover);
}

.error-button {
  background-color: var(--hx-color-error);
}

.error-button-hover {
  background-color: var(--hx-color-error-hover);
}
</style>
