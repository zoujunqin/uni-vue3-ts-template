<template>
  <uv-button
    class="pro-button"
    custom-style="border-radius: 6px; "
    custom-text-style="font-size: var(--hx-font-size-regular)"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default { options: { name: 'ProButton', virtualHost: true } };
</script>
