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
      @remove="removeReverseSideOfCard"
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
      data.value.ocrSure.front = true;
      setIdCardMessage({
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
  data.value.ocrSure.front = false;
};

// 身份证反面 ocr 识别
const ocrReverseSideOfCard = async ({ httpUrl }) => {
  try {
    const { back } = await ocr(httpUrl);

    if (back) {
      const { validPeriodBegin, validPeriodEnd, issueAuthority } = back;
      data.value.credentialStartDate = validPeriodBegin;
      data.value.credentialEndDate = validPeriodEnd;
      data.value.issuingAuthority = issueAuthority;
      data.value.ocrSure.reverse = true;
      return true;
    } else {
      uni.showToast({ title: '请上传身份证反面图片', icon: 'none' });
    }
  } catch {
    removeReverseSideOfCard();
  }
  return false;
};

const removeReverseSideOfCard = () => {
  data.value.ocrSure.reverse = false;
};
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
