<template>
  <view class="section-title hx-mb-[16px]"> 基本信息 </view>

  <view class="hx-flex hx-flex-col hx-items-center">
    <ProFormItem
      v-for="(item, index) in dynamicStateForm"
      :key="item.fieldCode"
      :label="item.labelName"
      :prop="item.fieldCode"
      :required="item.izRequired === 'yes'"
      borderBottom
      class="hx-w-full"
      label-width="250rpx"
    >
      <ProInput
        v-if="item.valueType === 'text'"
        v-model="data[item.fieldCode]"
        :placeholder="item?.labelName"
        class="!hx-pr-0"
        input-align="right"
      />
      <view
        v-if="item.valueType === 'select'"
        @click="handleOpenSelect(item, index)"
      >
        <ProInput
          v-model="item.dictValue"
          :placeholder="item?.labelName"
          class="!hx-pr-0"
          input-align="right"
          readonly
        />
      </view>
      <view
        v-if="getReadonlyBool(item.valueType)"
        @click="handleOpenDate(item.fieldCode)"
      >
        <ProInput
          v-model="data[item.fieldCode]"
          :placeholder="item?.labelName"
          class="!hx-pr-0"
          input-align="right"
          readonly
        />
      </view>
    </ProFormItem>
  </view>
  <ProDateTimePicker
    ref="datetimePickerRef"
    v-model="dayDate"
    :maxDate="2841840000000"
    :minDate="-631180800000"
    mode="date"
    @confirm="handleConfirmDate"
  />
  <ProPicker
    ref="proPickerRef"
    :columns="pickerValue"
    cancelText="重置"
    keyName="name"
    @confirm="handlePickerConfirm"
  />
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';

import { useVModel } from '@/hooks/useVModel';
import { handleDealTimestampDate } from '@/utils/date';

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
