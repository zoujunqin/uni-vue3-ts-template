<template>
  <template v-for="(item, index) in list" :key="index">
    <view class="section-title hx-leading-[19px] hx-mb-[16px]">
      {{ item.categoryName }}
    </view>
    <view class="hx-mb-[24px] hx-flex hx-flex-wrap">
      <view
        class="hx-text-center hx-h-[30px] hx-p-[8px_11px] hx-text-[#303133] hx-text-[14px] hx-leading-[14px] hx-bg-[#F7F8FA] hx-rounded-[6px] hx-mr-[10px] hx-mb-[10px]"
        :class="getClass(subItem)"
        v-for="(subItem, subIndex) in item.children"
        :key="subIndex"
        @click="handleSelect(subItem.id)"
      >
        <view
          class="icon-container hx-hidden hx-items-center hx-justify-center hx-absolute hx-w-[14px] hx-h-[8px] hx-bg-color-primary hx-rounded-tl-[6px] hx-right-0 hx-bottom-0"
        >
          <ProIcon name="checkmark" size="20rpx" color="white" />
        </view>
        <text> {{ subItem.name }} </text>
      </view>
    </view>
  </template>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';

import { ITreeTaskType, ITreeSubTaskType } from '@/api/fe/task/task_type';

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<number>>,
    default: () => []
  },
  list: {
    type: Array as PropType<Array<ITreeTaskType>>,
    default: () => []
  }
});
const emit = defineEmits(['update:modelValue']);

const selectIdList = computed({
  get: () => props.modelValue,
  set: (val: Array<number>) => {
    emit('update:modelValue', val);
  }
});
const handleSelect = (id: number) => {
  if (selectIdList.value.includes(id)) {
    selectIdList.value = selectIdList.value.filter(item => item !== id);
  } else {
    selectIdList.value = [...selectIdList.value, id];
  }
};

const getClass = (subItem: ITreeSubTaskType) => {
  return [
    subItem.name.length <= 4 ? 'hx-w-[80px]' : 'hx-w-[108px]',
    selectIdList.value.includes(subItem.id) ? 'active' : null
  ];
};
</script>

<script lang="ts">
export default { options: { name: 'TaskType', virtualHost: true } };
</script>

<style scoped>
.active {
  position: relative;
  color: var(--hx-color-primary);
  background: rgb(61 134 242 / 10%);
  border: 1px solid var(--hx-color-primary);
}

.active > .icon-container {
  display: flex;
}
</style>
