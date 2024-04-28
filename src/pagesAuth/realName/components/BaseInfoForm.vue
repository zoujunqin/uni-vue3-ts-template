<template>
  <view class="section-title hx-mb-[16px]"> 基本信息 </view>

  <view class="hx-flex hx-flex-col hx-items-center">
    <ProFormItem
      borderBottom
      v-for="(item, index) in dynamicStateForm"
      :key="item.fieldCode"
      :required="item.izRequired === 'yes'"
      class="hx-w-full"
      :label="item.labelName"
      :prop="item.fieldCode"
      label-width="250rpx"
    >
      <ProInput
        v-if="item.valueType === 'text'"
        class="!hx-pr-0"
        v-model="data[item.fieldCode]"
        input-align="right"
        :placeholder="item?.labelName"
      />
      <view
        v-if="item.valueType === 'select'"
        @click="handleOpenSelect(item, index)"
      >
        <ProInput
          class="!hx-pr-0"
          v-model="item.dictValue"
          input-align="right"
          readonly
          :placeholder="item?.labelName"
        />
      </view>
      <view
        v-if="getReadonlyBool(item.valueType)"
        @click="handleOpenDate(item.fieldCode)"
      >
        <ProInput
          class="!hx-pr-0"
          v-model="data[item.fieldCode]"
          input-align="right"
          readonly
          :placeholder="item?.labelName"
        />
      </view>
    </ProFormItem>
  </view>
  <ProDateTimePicker
    ref="datetimePickerRef"
    mode="date"
    :minDate="-631180800000"
    :maxDate="2841840000000"
    v-model="dayDate"
    @confirm="handleConfirmDate"
  />
  <ProPicker
    ref="proPickerRef"
    keyName="name"
    :columns="pickerValue"
    cancelText="重置"
    @confirm="handlePickerConfirm"
  />
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';

import { useVModel } from '@/hooks/useVModel';
import { handleDealTimestampDate } from '@/utils/processingText';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  dynamicStateForm: {
    type: Array<any>,
    default: () => []
  }
});

const data = useVModel(props, 'modelValue', undefined, {
  passive: true
});
const datetimePickerRef = ref();
const proPickerRef = ref();
const showDate = ref();
const dayDate = ref();
const pickerValue = ref<Array<any>>([]);
const clickFieldCode = ref('');
const indexClick = ref();
const handleOpenSelect = (val, index) => {
  indexClick.value = index;
  clickFieldCode.value = val.fieldCode;
  pickerValue.value = [val.dict];
  proPickerRef.value.open();
};
const getReadonlyBool = valueType => {
  return ['date'].includes(valueType);
};
const handlePickerConfirm = e => {
  data.value[clickFieldCode.value] = e.value[0].code;
  props.dynamicStateForm[indexClick.value].dictValue = e.value[0].name;
};
const handleConfirmDate = e => {
  dayDate.value = e.value;
  data.value[showDate.value] = handleDealTimestampDate(e.value);
};
const handleOpenDate = fieldCode => {
  showDate.value = fieldCode;
  dayDate.value = data.value[fieldCode];
  nextTick(() => {
    datetimePickerRef.value.open();
  });
};
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
