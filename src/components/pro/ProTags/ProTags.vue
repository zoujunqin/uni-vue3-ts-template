<template>
  <uv-tags
    v-bind="$attrs"
    :type="type"
    :size="size"
    :class="tagClass"
    :bg-color="typeConfig.bgColor"
    :color="typeConfig.color"
    ref="uvTagsRef"
    border-color="transparent"
    class="pro-tags"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { tagProps } from './props';

import { useFakerRef } from '@/hooks/useFakerRef';

const props = defineProps(tagProps);
const tagClass = computed(() => {
  return [`pro-${props.size}-tags`];
});

const typeMap = {
  primary: {
    color: 'var(--color-primary)',
    bgColor: 'rgb(12 136 250 / 10%)'
  },
  success: {
    color: 'var(--color-success)',
    bgColor: 'rgb(0 183 0 / 10%)'
  },
  warning: {
    color: 'var(--color-warning)',
    bgColor: 'rgb(255 50 50 / 10%)'
  },
  error: {
    color: 'var(--color-error)',
    bgColor: 'rgb(229 26 26 / 10%)'
  },
  disabled: {
    color: 'var(--text-color-placeholder)',
    bgColor: 'rgb(192 196 204 / 10%)'
  },
  info: {
    color: 'var(--text-color-tip)',
    bgColor: '#F7F8FA'
  }
};
const typeConfig = computed(() => typeMap[props.type]);

const { instance: uvTagsRef } = useFakerRef();
</script>

<script lang="ts">
export default { options: { name: 'ProTags', virtualHost: true } };
</script>

<style lang="scss">
.pro-medium-tags {
  @apply text-font-size-sm;
}
</style>
