<template>
  <view
    v-if="loading"
    class="pro-skeleton-rect hx-rounded-full hx-shadow-card"
    :class="openAnimate ? 'pro-skeleton--animation' : ''"
    :style="skeletonCircleStyle"
  />

  <slot v-else />
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';

import { provideKey } from '@/components/ProSkeleton/const';
import { rectProps } from '@/components/ProSkeletonRect/props';
import { hexToRgb } from '@/utils/color';

const props = defineProps(rectProps);

const { loading, animate } = inject(provideKey);

const openAnimate = computed(() => {
  return animate.value && props.animate;
});

const skeletonCircleStyle = computed(() => {
  const {
    width,
    height,
    bgColor,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom
  } = props;
  const style = {
    width,
    height,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    backgroundColor: bgColor
  };

  if (openAnimate.value) {
    const { r, g, b } = hexToRgb(bgColor);
    const step = 5;
    const prevColor = 'rgb(' + [r - step, g - step, b - step].join(',') + ')';
    const nextColor = 'rgb(' + [r + step, g + step, b + step].join(',') + ')';
    style.backgroundImage = `linear-gradient(90deg, ${prevColor} 25%, ${nextColor} 37%, ${prevColor} 50%)`;
  }

  return style;
});
</script>

<script lang="ts">
export default {
  options: { name: 'ProSkeletonCircle', virtualHost: true }
};
</script>

<style scoped>
.pro-skeleton--animation {
  background-size: 400% 100%;
  animation: skeleton 1.8s linear infinite;
}

@keyframes skeleton {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
