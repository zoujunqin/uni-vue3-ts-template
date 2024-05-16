<template>
  <z-paging
    ref="zPagingRef"
    v-bind="$attrs"
    v-model="dataList"
    loading-more-enabled
    :fixed="false"
    :auto="false"
    :refresher-enabled="true"
    :use-virtual-list="true"
    :default-page-size="10"
    :empty-view-center="false"
    @query="handleQuery"
  >
    <slot v-for="(item, index) in dataList" :key="index" :row="item" />

    <template #empty>
      <slot name="empty">
        <ProPlaceholder class="hx-mt-[30%]" type="noData" @refresh="reload" />
      </slot>
    </template>
  </z-paging>
</template>

<script setup lang="ts">
import { useHandler } from './hooks/useHandler';
import { scrollListProps } from './props';

const props = defineProps(scrollListProps);
const { zPagingRef, dataList, handleQuery } = useHandler(props);

const reload = () => {
  zPagingRef.value.reload();
};

defineExpose({ reload });
</script>

<script lang="ts">
export default { options: { name: 'ProScrollList', virtualHost: true } };
</script>
