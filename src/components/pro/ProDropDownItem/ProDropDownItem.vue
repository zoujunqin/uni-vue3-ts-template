<template>
  <uv-drop-down-item ref="uvDropDownRef" v-bind="$attrs" />
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default { options: { name: 'ProDropDownItem', virtualHost: true } };
</script>
