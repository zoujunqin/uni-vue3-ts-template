<template>
  <uv-navbar
    bg-color="transparent"
    v-bind="{ ...$attrs, ...bridgedEvents, autoBack: false }"
    :fixed="false"
  >
    <template #left>
      <slot v-if="leftSlot" name="left" />
      <view v-else class="flex">
        <ProIcon
          v-if="backButtonVisible"
          :size="leftIconSize"
          :name="leftIcon"
          :color="leftIconColor"
          @click="handle2Back"
        />
        <ProIcon
          v-if="homeButtonVisible"
          :size="homeIconSize"
          :name="homeIcon"
          :color="homeIconColor"
          @click="handle2Home"
        />
      </view>
    </template>

    <template v-slot:[centerSlot]>
      <slot name="center" />
    </template>

    <template v-slot:[rightSlot]>
      <slot name="right" />
    </template>
  </uv-navbar>
</template>
<script lang="ts" setup>
/*
 * 1. 永久设定了 fixed: false, 要用 navbar 请用 ProHeader
 * 2. 永久设置了 autoBack: false
 * 3. uv-navbar 的 leftText 无效
 * */
import { computed, useSlots } from 'vue';

import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useRouter } from '@/router/router';

defineProps({
  leftIcon: { type: String, default: 'arrow-left' },
  leftIconSize: { type: String, default: '24' },
  leftIconColor: { type: String, default: '#303133' },
  homeIcon: { type: String, default: 'home' },
  homeIconSize: { type: String, default: '24' },
  homeIconColor: { type: String, default: '#303133' }
});

const { bridgedEvents } = useBridgedEmits(uvEvents);

const leftSlot = computed(() => (useSlots()?.left ? 'left' : ''));
const centerSlot = computed(() => (useSlots()?.center ? 'center' : ''));
const rightSlot = computed(() => (useSlots()?.right ? 'right' : ''));

const backButtonVisible = computed(() => getCurrentPages().length > 1);

const router = useRouter();
const homeButtonVisible = computed(() => {
  const page = getCurrentPages()[0];
  return !backButtonVisible.value && page.route !== router.routes[0].route;
});

const handle2Back = () => {
  router.back();
};

const handle2Home = () => {
  router.replaceAll({ name: router.routes[0].name });
};
</script>
