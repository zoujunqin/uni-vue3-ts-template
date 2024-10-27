<template>
  <uv-tooltip ref="uvTooltipRef" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { useFakerRef } from '@/hooks/useFakerRef';

const { instance: uvTooltipRef } = useFakerRef();

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
