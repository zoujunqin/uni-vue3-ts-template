<template>
  <uv-line-progress v-bind="$attrs">
    <slot />
  </uv-line-progress>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  options: { name: 'ProLineProgress', virtualHost: true }
};
</script>
