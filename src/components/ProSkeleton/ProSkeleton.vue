<template>
  <view class="pro-skeleton">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';

import { provideKey } from './const';

const props = defineProps({
  loading: Boolean,
  animate: {
    type: Boolean,
    default: true
  }
});

const loading = computed(() => props.loading);
const animate = computed(() => props.animate);

provide(provideKey, { loading, animate });
</script>

<script lang="ts">
export default {
  options: { name: 'ProSkeleton', virtualHost: true }
};
</script>
