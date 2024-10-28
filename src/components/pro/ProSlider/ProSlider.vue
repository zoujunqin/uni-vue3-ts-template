<template>
  <uv-slider ref="uvSliderRef" v-bind="{ ...$attrs, ...bridgedEvents }" />
</template>

<script setup lang="ts">
import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useFakerRef } from '@/hooks/useFakerRef';

const { instance: uvSliderRef } = useFakerRef();
const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default {
  options: { name: 'ProSlider', virtualHost: true }
};
</script>
