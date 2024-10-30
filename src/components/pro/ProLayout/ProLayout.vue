<template>
  <view :style="layoutStyle" class="pro-layout hx-h-full hx-flex hx-flex-col">
    <ProPageHeader
      v-if="props.showHeader && props.headerFixed"
      :headerProps="props.headerProps"
      :navbarProps="props.navbarProps"
      :show-navbar="props.showNavbar"
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

      <slot name="header" />
    </ProPageHeader>

    <view class="hx-flex-1 hx-overflow-y-auto">
      <ProPageHeader
        v-if="props.showHeader && !props.headerFixed"
        :headerProps="props.headerProps"
        :navbarProps="props.navbarProps"
        :show-navbar="props.showNavbar"
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

        <slot name="header" />
      </ProPageHeader>

      <slot />

      <ProPageFooter
        v-if="props.showFooter && !props.footerFixed"
        :footerProps="props.footerProps"
      >
        <slot name="footer" />
      </ProPageFooter>
    </view>

    <ProPageFooter
      v-if="props.showFooter && props.footerFixed"
      :footerProps="props.footerProps"
    >
      <slot name="footer" />
    </ProPageFooter>
  </view>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, useSlots } from 'vue';

import { useSystemStore } from '@/pinia/modules/system';

const props = defineProps({
  safeAreaInsetTop: Boolean,
  showHeader: Boolean,
  headerFixed: { type: Boolean, default: true },
  headerProps: { type: Object, default: () => ({}) },
  showFooter: Boolean,
  footerFixed: { type: Boolean, default: true },
  footerProps: { type: Object, default: () => ({}) },
  showNavbar: { type: Boolean, default: true },
  navbarProps: { type: Object, default: () => ({ fixed: false }) }
});

const { systemInfo } = storeToRefs(useSystemStore());
const layoutStyle = computed(() => {
  const statusBarHeight = systemInfo.value.statusBarHeight || 0;
  return {
    'padding-top':
      (props.safeAreaInsetTop && !props.showNavbar ? statusBarHeight : 0) + 'PX'
  };
});

const leftSlot = computed(() => (useSlots()?.navbarLeft ? 'navbarLeft' : ''));
const centerSlot = computed(() =>
  useSlots()?.navbarCenter ? 'navbarCenter' : ''
);
const rightSlot = computed(() => (useSlots()?.navRight ? 'navRight' : ''));
</script>

<script lang="ts">
export default { options: { name: 'ProLayout', virtualHost: true } };
</script>
