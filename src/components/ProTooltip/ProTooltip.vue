<template>
  <uv-tooltip ref="uvTooltipRef" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

const uvTooltipRef = shallowRef();

const open = () => {
  uvTooltipRef.value.tooltipTop = 0;
  uvTooltipRef.value.showTooltip = true;
};
const close = () => {
  uvTooltipRef.value.showTooltip = false;
};

defineExpose({
  open,
  close
});
</script>

<script lang="ts">
export default { options: { name: 'ProTooltip', virtualHost: true } };
</script>
