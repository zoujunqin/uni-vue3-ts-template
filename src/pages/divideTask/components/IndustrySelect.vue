<template>
  <template v-for="(item, index) in list" :key="index">
    <view class="section-title hx-leading-[19px] hx-mb-[16px]">
      {{ item.title }}
    </view>
    <view class="hx-mb-[24px] hx-flex hx-flex-wrap">
      <view
        class="hx-text-center hx-h-[30px] hx-p-[8px_11px] hx-text-[#303133] hx-text-[14px] hx-leading-[14px] hx-bg-[#F7F8FA] hx-rounded-[6px] hx-mr-[10px] hx-mb-[10px]"
        :class="getClass(subItem)"
        v-for="(subItem, subIndex) in item.children"
        :key="subIndex"
        @tap.stop="handleSelect(subItem.id)"
      >
        <view
          class="icon-container hx-hidden hx-items-center hx-justify-center hx-absolute hx-w-[14px] hx-h-[8px] hx-bg-color-primary hx-rounded-tl-[6px] hx-right-0 hx-bottom-0"
        >
          <ProIcon name="checkmark" size="20rpx" color="white" />
        </view>
        <text> {{ subItem.title }} </text>
      </view>
    </view>
  </template>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';

interface IDataItem {
  title: string;
  id: number;
  children: Array<IDataItem>;
}

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<number>>,
    default: () => []
  },
  list: {
    type: Array as PropType<Array<IDataItem>>,
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

const getClass = (subItem: IDataItem) => {
  return [
    subItem.title.length <= 4 ? 'hx-w-[80px]' : 'hx-w-[108px]',
    selectIdList.value.includes(subItem.id) ? 'active' : null
  ];
};
</script>

<script lang="ts">
export default { options: { name: 'IndustrySelect', virtualHost: true } };
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
