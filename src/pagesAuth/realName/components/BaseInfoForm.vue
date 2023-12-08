<template>
  <view class="section-title hx-mb-[16px]"> 基本信息 </view>

  <view class="hx-flex hx-flex-col hx-items-center">
    <ProFormItem
      required
      class="hx-w-full"
      label="姓名"
      prop="name"
      label-width="250rpx"
    >
      <ProInput
        class="!hx-pr-0"
        v-model="data.name"
        input-align="right"
        placeholder="请输入姓名"
      />
    </ProFormItem>

    <ProFormItem
      required
      class="hx-w-full"
      label="身份证号"
      prop="sex"
      label-width="250rpx"
    >
      <ProInput
        class="!hx-pr-0"
        v-model="data.sex"
        placeholder="请输入身份证号"
        input-align="right"
      />
    </ProFormItem>
  </view>
</template>

<script setup lang="ts">
import { useVModel } from '@/hooks/useVModel';

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits(['update:formData']);

const data = useVModel(props, 'formData', emit);
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
