<template>
  <uv-calendars ref="uvCalendarsRef" v-bind="{ ...$attrs, ...bridgedEvents }" />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvCalendarsRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvCalendarsRef);
defineExpose({ ...bridgedMethods });
</script>

<script lang="ts">
export default {
  options: { name: 'ProCalendars', virtualHost: true }
};
</script>
