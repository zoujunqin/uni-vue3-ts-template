import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';

import { getOcrIdCard } from '@/api/system/ocr';
import { useOss } from '@/hooks/useOss';

const storeId = 'realName';

export const useRealNameStore = defineStore(
  storeId,
  () => {
    const formData = ref<Record<string, any>>({});

    // ocr识别的身份证正面信息，用于申诉
    const idCardFrontInfo = shallowRef<{ name?: string; idNumber?: string }>(
      null
    );
    const getIdCardFrontInfo = async () => {
      if (!idCardFrontInfo.value) {
        const { idCardFront } = formData.value;
        if (idCardFront) {
          const params = {
            imageUrl: await useOss().getPreviewUrl(idCardFront),
            needParse: true
          };

          const { face } = (await getOcrIdCard(params)) || null;
          if (face) {
            const { name, idNumber } = face;

            setIdCardFrontInfo({
              name,
              idNumber
            });
          }
        }
      }

      return idCardFrontInfo.value;
    };
    const setIdCardFrontInfo = (v: { name; idNumber }) => {
      idCardFrontInfo.value = v;
    };

    const initFormData = () => {
      formData.value = {};
    };

    /**
     * 清除 storage 中的 formData 数据
     */
    const clearStorageFormData = () => {
      uni.setStorageSync(storeId, {
        formData: {},
        idCardFrontInfo: idCardFrontInfo.value
      });
    };

    /**
     * 取 storage 中的 formData 数据
     */
    const getStorageFormData = () => {
      const storageFormData = uni.getStorageSync(storeId);

      try {
        return JSON.parse(storageFormData)?.formData;
      } catch {
        return {};
      }
    };

    return {
      formData,
      getStorageFormData,
      clearStorageFormData,

      idCardFrontInfo,
      getIdCardFrontInfo,
      setIdCardFrontInfo,
      initFormData
    };
  },
  {
    // 开启持久化缓存
    // @ts-ignore
    unistorage: true
  }
);
