<template>
  <uv-tags v-bind="$attrs" :size="size" :class="tagClass" class="pro-tags" />
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue';

const props = defineProps({
  size: {
    type: String as PropType<'large' | 'medium' | 'mini'>,
    default: 'medium'
  }
});

const tagClass = computed(() => {
  return [`pro-${props.size}-tags`];
});
</script>

<style scoped>
.pro-medium-tags {
  @apply hx-text-font-size-sm;
}
</style>
