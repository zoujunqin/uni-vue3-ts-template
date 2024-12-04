<template>
  <view :class="{ 'pro-header-shadow': shadow }" class="pro-header">
    <ProNavbar
      v-if="showNavbar"
      v-bind="props.navbarProps"
      :safeAreaInsetTop="props.safeArea"
    >
      <template v-slot:[leftSlot]>
        <slot name="navbarLeft" />
      </template>

      <template v-slot:[centerSlot]>
        <slot name="navbarCenter" />
      </template>

      <template v-slot:[rightSlot]>
        <slot name="navbarRight" />
      </template>
    </ProNavbar>

    <slot />
  </view>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';

defineOptions({ options: { virtualHost: true } });

const props = defineProps({
  shadow: Boolean,
  showNavbar: Boolean,
  safeArea: { type: Boolean, default: true },
  navbarProps: { type: Object, default: () => ({}) }
});

const leftSlot = computed(() => (useSlots()?.navbarLeft ? 'left' : ''));
const centerSlot = computed(() => (useSlots()?.navbarCenter ? 'center' : ''));
const rightSlot = computed(() => (useSlots()?.navbarRight ? 'right' : ''));
</script>

<style scoped>
.pro-header-shadow {
  box-shadow: 0 6px 6px 0 rgb(0 33 81 / 3%);
}
</style>
