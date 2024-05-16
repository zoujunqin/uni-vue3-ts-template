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
      :do-after-upload-success="ocrFrontOfCard"
      background-name="front-id-card"
      class="hx-mb-[16px]"
      upload-button-title="点击上传人像面"
      @remove="removeFrontOfCard"
    />
    <ProUpload
      v-model="data.idCardReverse"
      :do-after-upload-success="ocrReverseSideOfCard"
      background-name="back-id-card"
      upload-button-title="点击上传国徽面"
    />
  </view>
</template>

<script lang="ts" setup>
import { useRealNameStore } from '../hooks/useStore';

import { getOcrIdCard } from '@/api/system/ocr';
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

const { setIdCardFrontInfo } = useRealNameStore();

const ocr = async imageUrl => {
  const params = {
    imageUrl,
    needParse: true
  };
  return await getOcrIdCard(params);
};

// 身份证正面 ocr 识别
const ocrFrontOfCard = async ({ httpUrl }) => {
  try {
    const { face } = await ocr(httpUrl);

    if (face) {
      const { name, idNumber, address } = face;
      data.value.workerName = name;
      data.value.idCardNo = idNumber;
      data.value.domicileAddress = address;

      // 保存身份证正面 ocr 信息，用于申诉
      setIdCardFrontInfo({
        name,
        idNumber
      });

      return true;
    } else {
      uni.showToast({ title: '请上传身份证正面图片', icon: 'none' });
    }
  } catch {
    removeFrontOfCard();
  }
  return false;
};

const removeFrontOfCard = () => {
  setIdCardFrontInfo(null);
};

// 身份证反面 ocr 识别
const ocrReverseSideOfCard = async ({ httpUrl }) => {
  const { back } = await ocr(httpUrl);

  if (back) {
    const { validPeriodBegin, validPeriodEnd, issueAuthority } = back;
    data.value.credentialStartDate = validPeriodBegin;
    data.value.credentialEndDate = validPeriodEnd;
    data.value.issuingAuthority = issueAuthority;
    return true;
  } else {
    uni.showToast({ title: '请上传身份证反面图片', icon: 'none' });
  }
  return false;
};
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
