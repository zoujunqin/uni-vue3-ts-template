<template>
  <ProDropDownPopupWrapper
    ref="proDropDownPopupWrapperRef"
    v-bind="{ ...$attrs, ...bridgedEvents }"
    @cancel="handleCancelSelectIndustry"
    @confirm="handleConfirmSelectIndustry"
  >
    <IndustrySelect :list="dataList" v-model="industryList" />
  </ProDropDownPopupWrapper>
</template>

<script setup lang="ts">
import IndustrySelect from './IndustrySelect.vue';
import { shallowRef, PropType, watch } from 'vue';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { uvEvents } from '@/components/ProDropDownPopup/events';
import { uvMethods } from '@/components/ProDropDownPopup/methods';

const dataList = [
  {
    title: '软件和信息技术行业',
    children: [
      {
        id: 1,
        title: '软件1开发'
      },
      {
        id: 2,
        title: '前343443343端'
      },
      {
        id: 5,
        title: '软件1开发'
      },
      {
        id: 6,
        title: '前端'
      },
      {
        id: 7,
        title: '软件1开发'
      },
      {
        id: 8,
        title: '前端'
      }
    ]
  },
  {
    title: '软件和信息技术行业',
    children: [
      {
        id: 3,
        title: '软件开发'
      },
      {
        id: 4,
        title: '前端'
      }
    ]
  },
  {
    title: '软件和信息技术行业',
    children: [
      {
        id: 1,
        title: '软件1开发'
      },
      {
        id: 2,
        title: '前端'
      },
      {
        id: 5,
        title: '软件1开发'
      },
      {
        id: 6,
        title: '前端'
      },
      {
        id: 7,
        title: '软件1开发'
      },
      {
        id: 8,
        title: '前端'
      }
    ]
  },
  {
    title: '软件和信息技术行业',
    children: [
      {
        id: 3,
        title: '软件开发'
      },
      {
        id: 4,
        title: '前端'
      }
    ]
  }
];

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<number>>,
    default: () => []
  }
});
const emit = defineEmits(['update:modelValue']);
const { bridgedEvents } = useBridgedEmits(uvEvents);

const industryList = shallowRef([]);
watch(
  () => props.modelValue,
  () => {
    industryList.value = [...props.modelValue];
  },
  { immediate: true }
);

const handleCancelSelectIndustry = () => {
  industryList.value = [...props.modelValue];
};
const handleConfirmSelectIndustry = () => {
  emit('update:modelValue', [...industryList.value]);
};

const proDropDownPopupWrapperRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(
  uvMethods,
  proDropDownPopupWrapperRef
);
defineExpose({ ...bridgedMethods });
</script>

<script lang="ts">
export default {
  options: { name: 'IndustryDropDownPopup', virtualHost: true }
};
</script>
