<template>
  <view class="section-title hx-mb-[6px]"> 资质信息 </view>
  <view
    class="hx-mb-[16px] hx-text-text-color-tip hx-text-font-size-base hx-font-[400] hx-leading-[18px]"
  >
    请上传png，jpg，jpeg格式，文件大小不超过5M
  </view>

  <view
    class="hx-flex hx-flex-col hx-items-center"
    v-for="item in dynamicStateForm"
    :key="item.fieldCode"
  >
    <ProUpload
      class="hx-mb-[16px]"
      v-model="data[item.fieldCode]"
      :background-name="getImageTipText(item.fieldCode)"
      :upload-button-title="getTipText(item.labelName)"
      :maxSize="5 * 1024 * 1024"
    />
  </view>
</template>

<script setup lang="ts">
import { useVModel } from '@/hooks/useVModel';

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

const modeType = {
  drivingLicence: 'driving-license',
  busineseLicense: 'business-license',
  healthCertificate: 'health-certificate',
  otherCertification: 'other-certificate'
};

const getTipText = text => {
  return `点击上传${text}`;
};
const getImageTipText = type => {
  return modeType[type];
};
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
