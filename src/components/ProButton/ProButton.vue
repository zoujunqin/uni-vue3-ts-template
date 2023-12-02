<template>
  <uv-button
    v-bind="$attrs"
    custom-style="border-radius: 6px; "
    custom-text-style="font-size: var(--hx-font-size-regular)"
  />
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
