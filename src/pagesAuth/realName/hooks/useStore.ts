import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';

export const useRealNameStore = defineStore(
  'realName',
  () => {
    const formData = ref<Record<string, any>>({});

    // ocr识别的身份证正面信息，用于申诉
    const idCardFrontInfo = shallowRef<{ name?: string; idNumber?: string }>(
      null
    );
    const setIdCardFrontInfo = (v: { name; idNumber }) => {
      idCardFrontInfo.value = v;
    };

    return { formData, idCardFrontInfo, setIdCardFrontInfo };
  },
  {
    // 开启持久化缓存
    // @ts-ignore
    unistorage: true
  }
);
