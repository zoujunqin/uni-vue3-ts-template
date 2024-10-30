<template>
  <view
    :style="headerStyle"
    :class="{ 'pro-header-shadow': shadow }"
    class="pro-header"
  >
    <ProNavbar
      v-if="showNavbar"
      :fixed="false"
      :style="props.navbarProps.style"
      :class="props.navbarProps.class"
      v-bind="props.navbarProps"
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
import { storeToRefs } from 'pinia';
import { computed, useSlots } from 'vue';

import { useSystemStore } from '@/pinia/modules/system';

const props = defineProps({
  shadow: Boolean,
  fixed: Boolean,
  offsetTop: { type: Number, default: 0 },
  safeArea: Boolean,
  showNavbar: Boolean,
  navbarProps: { type: Object, default: () => ({}) }
});

const { systemInfo } = storeToRefs(useSystemStore());
const headerStyle = computed(() => {
  const statusBarHeight = systemInfo.value.statusBarHeight || 0;
  const { safeArea, showNavbar, fixed, offsetTop } = props;
  return {
    position: fixed ? 'sticky' : 'static',
    top: offsetTop,
    'padding-top': (safeArea && !showNavbar ? statusBarHeight : 0) + 'PX'
  };
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

<script lang="ts">
export default { options: { name: 'ProHeader', virtualHost: true } };
</script>
