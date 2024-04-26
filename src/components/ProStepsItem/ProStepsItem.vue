<template>
  <uv-steps-item v-bind="$attrs">
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>

    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <template v-if="$slots.desc" #desc>
      <slot name="desc" />
    </template>
  </uv-steps-item>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  options: { name: 'ProStepsItem', virtualHost: true }
};
</script>

<style></style>
