<template>
  <uv-tags
    v-bind="$attrs"
    :type="type"
    :size="size"
    :class="tagClass"
    border-color="transparent"
    :bg-color="typeConfig.bgColor"
    :color="typeConfig.color"
    class="pro-tags"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { tagProps } from './props';

const props = defineProps(tagProps);
const tagClass = computed(() => {
  return [`pro-${props.size}-tags`];
});

const typeMap = {
  primary: {
    color: 'var(--hx-color-primary)',
    bgColor: 'rgb(12 136 250 / 10%)'
  },
  success: {
    color: 'var(--hx-color-success)',
    bgColor: 'rgb(0 183 0 / 10%)'
  },
  warning: {
    color: 'var(--hx-color-warning)',
    bgColor: 'rgb(255 50 50 / 10%)'
  },
  error: {
    color: 'var(--hx-color-error)',
    bgColor: 'rgb(229 26 26 / 10%)'
  },
  disabled: {
    color: 'var(--hx-text-color-placeholder)',
    bgColor: 'rgb(192 196 204 / 10%)'
  },
  info: {
    color: 'var(--hx-text-color-tip)',
    bgColor: '#F7F8FA'
  }
};
const typeConfig = computed(() => typeMap[props.type]);
</script>

<script lang="ts">
export default { options: { name: 'ProTags', virtualHost: true } };
</script>

<style lang="scss">
.pro-medium-tags {
  @apply hx-text-font-size-sm;
}
</style>
