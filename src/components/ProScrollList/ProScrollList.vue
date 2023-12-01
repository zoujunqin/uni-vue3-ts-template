<template>
  <z-paging
    ref="zPagingRef"
    v-bind="$attrs"
    v-model="dataList"
    loading-more-enabled
    :auto="false"
    :refresher-enabled="false"
    :use-virtual-list="true"
    :default-page-size="3"
    @query="handleQuery"
  >
    <slot v-for="(item, index) in dataList" :key="index" :row="item" />
  </z-paging>
</template>

<script setup lang="ts">
import { scrollListProps } from './props';
import { useHandler } from './hooks/useHandler';

const props = defineProps(scrollListProps);
const { zPagingRef, dataList, handleQuery } = useHandler(props);

defineExpose({
  reload: () => {
    zPagingRef.value.reload();
  }
});
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
