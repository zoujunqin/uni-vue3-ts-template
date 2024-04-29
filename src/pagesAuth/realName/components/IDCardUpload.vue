<template>
  <view class="section-title hx-mb-[6px]"> 上传身份证 </view>

  <view
    class="hx-mb-[16px] hx-text-text-color-tip hx-text-font-size-base hx-font-[400] hx-leading-[18px]"
  >
    请确保证件边框完整、字体清晰、亮度均匀
  </view>

  <view class="hx-flex hx-flex-col hx-items-center">
    <ProUpload
      v-model="data.idCardFront"
      :do-after-upload-success="path => handleUploadSuccess(path, 'Front')"
      background-name="front-id-card"
      class="hx-mb-[16px]"
      upload-button-title="点击上传人像面"
      @remove="handleRemovePath('Front')"
    />
    <ProUpload
      v-model="data.idCardReverse"
      :do-after-upload-success="path => handleUploadSuccess(path, 'Reverse')"
      background-name="back-id-card"
      upload-button-title="点击上传国徽面"
      @remove="handleRemovePath('Reverse')"
    />
  </view>
</template>

<script lang="ts" setup>
import { getOcrIdCard } from '@/api/system/ocr';
import { useVModel } from '@/hooks/useVModel';
import { setIdCardMessage } from '@/utils/storage';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
});
const data = useVModel(props, 'modelValue', undefined, {
  passive: true
});

const handleUploadSuccess = async (previewUrl, type) => {
  const params = {
    imageUrl: previewUrl,
    needParse: true
  };

  try {
    const res = await getOcrIdCard(params);
    if (type === 'Front') {
      if (!res.face) {
        uni.showToast({ title: '请上传身份证正面图片', icon: 'none' });
        return;
      }

      const { name, idNumber, address } = res.face;
      data.value.workerName = name;
      data.value.idCardNo = idNumber;
      data.value.domicileAddress = address;
      data.value.ocrSure.front = true;
      setIdCardMessage({
        name,
        idNumber
      });
    } else {
      if (!res.back) {
        uni.showToast({ title: '请上传身份证反面图片', icon: 'none' });
        return;
      }

      const { validPeriodBegin, validPeriodEnd, issueAuthority } = res.back;
      data.value.credentialStartDate = validPeriodBegin;
      data.value.credentialEndDate = validPeriodEnd;
      data.value.issuingAuthority = issueAuthority;
      data.value.ocrSure.reverse = true;
    }
  } catch {
    handleRemovePath(type);
  }
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
