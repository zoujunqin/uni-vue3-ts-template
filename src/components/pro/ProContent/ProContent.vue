<template>
  <view :style="contentStyle" class="pro-content hx-flex-1 hx-overflow-y-auto">
    <slot />
  </view>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, getCurrentInstance, onMounted } from 'vue';

import { useSystemStore } from '@/pinia/modules/system';

const props = defineProps({ safeArea: Boolean });

const { systemInfo } = storeToRefs(useSystemStore());
const contentStyle = computed(() => {
  const statusBarHeight = systemInfo.value.statusBarHeight || 0;
  return {
    'padding-top':
      (props.safeArea && !props.showNavbar ? statusBarHeight : 0) + 'PX'
  };
});

const currentInsurance = getCurrentInstance();
onMounted(() => {
  console.log(currentInsurance);
  // const headerInsurance = currentInsurance.proxy.$children.find(
  //   ins => ins.$options.options.name === 'ProHeader'
  // );
  // const currentQuery = uni.createSelectorQuery().in(headerInsurance);
  // currentQuery
  //   .select('.pro-header')
  //   .boundingClientRect(boundingRect => {
  //     console.log(11, boundingRect);
  //   })
  //   .exec();
});
</script>

<script lang="ts">
export default {
  options: { name: 'ProContent', virtualHost: true }
};
</script>
