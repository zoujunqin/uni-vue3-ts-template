<template>
  <view class="section-title hx-mb-[6px]"> 上传身份证 </view>
  <view
    class="hx-mb-[16px] hx-text-text-color-tip hx-text-font-size-base hx-font-[400] hx-leading-[18px]"
  >
    请确保证件边框完整、字体清晰、亮度均匀
  </view>
  <view class="hx-flex hx-flex-col hx-items-center">
    <ProUpload
      class="hx-mb-[16px]"
      v-model="data.idCardFront"
      background-name="front-id-card"
      upload-button-title="点击上传人像面"
      @uploadSuccess="handleUploadSuccess($event, 'Front')"
      @handleRemovePath="handleRemovePath('Front')"
    />
    <ProUpload
      v-model="data.idCardReverse"
      background-name="back-id-card"
      upload-button-title="点击上传国徽面"
      @uploadSuccess="handleUploadSuccess($event, 'Reverse')"
      @handleRemovePath="handleRemovePath('Reverse')"
    />
  </view>
</template>

<script setup lang="ts">
import { getOcrIdCard } from '@/api/system/ocr.ts';
import { useVModel } from '@/hooks/useVModel';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
});
const data = useVModel(props, 'modelValue', undefined, {
  passive: true
});
const handleUploadSuccess = (previewUrl, type) => {
  const params = {
    imageUrl: previewUrl,
    needParse: true
  };
  getOcrIdCard(params)
    .then(res => {
      if (type === 'Front') {
        const {
          name,
          idNumber,
          address,
          domicileDistrictCode,
          domicileProvince,
          domicileCity,
          domicileDistrict
        } = res.face;
        data.value.workerName = name;
        data.value.idCardNo = idNumber;
        data.value.domicileAddress = address;
        data.value.ocrSure.front = true;
        data.value.ocrSure.areaText = `${domicileProvince}/${domicileCity}/${domicileDistrict}`;
        data.value.domicileAreaCode = domicileDistrictCode.toString();
      } else {
        const { validPeriodBegin, validPeriodEnd, issueAuthority } = res.back;
        data.value.credentialStartDate = validPeriodBegin;
        data.value.credentialEndDate = validPeriodEnd;
        data.value.issuingAuthority = issueAuthority;
        data.value.ocrSure.reverse = true;
      }
    })
    .catch(() => {
      handleRemovePath(type);
    });
};
const handleRemovePath = type => {
  if (type === 'Front') {
    data.value.ocrSure.front = false;
  } else {
    data.value.ocrSure.reverse = false;
  }
};
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
