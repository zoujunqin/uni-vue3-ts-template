import { shallowRef } from 'vue';
import { useOss } from '@/hooks/useOss';
import ChooseMediaOption = UniNamespace.ChooseMediaOption;
import ChooseMediaSuccessCallbackResult = UniNamespace.ChooseMediaSuccessCallbackResult;
import ChooseMediaFailCallback = UniNamespace.ChooseMediaFailCallback;
import ChooseMediaSuccessCallback = UniNamespace.ChooseMediaSuccessCallback;

/* 灵工模块 */
const module = 'fe';

type UploadParam = {
  chooseSuccess?: ChooseMediaSuccessCallback;
  chooseFail?: ChooseMediaFailCallback;
  uploadSuccess?: ({ filePath: string, previewUrl: string }) => void;
  uploadFail?: (err: unknown) => void;
};

export function useOssUploadImage(options: ChooseMediaOption) {
  const loading = shallowRef(false);
  const { uploadFile, getPreviewUrl } = useOss();

  const upload = ({
    chooseSuccess,
    chooseFail,
    uploadSuccess,
    uploadFail
  }: UploadParam) => {
    uni.chooseMedia({
      ...options,
      mediaType: ['image'],
      success: (res: ChooseMediaSuccessCallbackResult) => {
        const { tempFilePath } = res.tempFiles[0];
        chooseSuccess(res);

        loading.value = true;
        uploadFile(module, tempFilePath)
          .then(async filePath => {
            const previewUrl = await getPreviewUrl(filePath as string);
            uploadSuccess({ filePath, previewUrl });
          })
          .catch(uploadFail)
          .finally(() => {
            loading.value = false;
          });
      },
      fail: chooseFail
    });
  };

  return {
    loading,
    upload
  };
}
