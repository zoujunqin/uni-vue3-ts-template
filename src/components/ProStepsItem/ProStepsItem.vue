<template>
  <uv-steps-item v-bind="$attrs">
    <template #icon>
      <slot name="icon" />
    </template>

    <!--  FIXME: 动态判断插槽有问题  -->
    <view v-if="$attrs.title">
      <template #title>
        <slot name="title" />
      </template>
    </view>

    <view v-if="$attrs.desc">
      <template #desc>
        <slot name="desc" />
      </template>
    </view>
  </uv-steps-item>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  options: { name: 'ProStepsItem', virtualHost: true }
};
</script>
