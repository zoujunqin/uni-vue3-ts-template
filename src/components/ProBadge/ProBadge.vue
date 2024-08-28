<template>
  <uv-badge v-bind="$attrs" v-if="$attrs.value !== 0 && !!$attrs.value" />
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  options: { name: 'ProBadge', virtualHost: true }
};
</script>
