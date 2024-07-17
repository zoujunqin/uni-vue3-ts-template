<template>
  <uv-swiper ref="uvSwiperRef" v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />
  </uv-swiper>
</template>

<script lang="ts" setup>
import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useFakerRef } from '@/hooks/useFakerRef';

const { instance: uvSwiperRef } = useFakerRef();
const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default {
  options: { name: 'ProSwiper', virtualHost: true }
};
</script>
