// @ts-nocheck
import axios from 'axios';

import { ModuleType, OssUploadConfig } from './types';

import { getOssHttpPath, getOssPolicy } from '@/api/system/oss';
import { getUUID } from '@/utils';

export const useOss = () => {
  const uploadFile = (
    module: ModuleType,
    filePath: string,
    fileName?: string
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      let ossConfig: OssUploadConfig;
      try {
        const type = getFileSuffix(filePath);
        ossConfig = await getOssPolicy({
          module,
          type,
          fileName: fileName || 'mp-' + getUUID()
        });
      } catch (error) {
        return reject(error);
      }

      const { accessid, host, key, policy, signature } = ossConfig;
      uni.uploadFile({
        url: host,
        filePath,
        name: 'file', // 必须填file。
        formData: {
          key,
          policy,
          OSSAccessKeyId: accessid,
          signature
          // 'x-oss-security-token': securityToken // 使用STS签名时必传。
        },
        success: res => {
          if (res.statusCode === 204) {
            resolve(key);
          }
        },
        fail: err => reject(err)
      });
    });
  };

  const getPreviewUrl = async (fileRelativePath: string) => {
    return await getOssHttpPath({ key: fileRelativePath });
  };

  /**
   * @description 下载文件
   * @param fileRelativePath 文件相对地址 | 文件名
   * @param fileRename 文件重命名
   * @return void
   */

  const downloadOSSFile = async (fileRelativePath: string) => {
    const httpUrl = await getOssHttpPath({ key: fileRelativePath });
    downloadFile(httpUrl);
  };

  const getFileSuffix = (filePath: string): string => {
    const suffixReg = filePath.match(/\.[^.]+$/);
    return suffixReg?.[0]?.substring(1) || '';
  };

  /**
   * @description 图片尺寸验证
   * @param { File } file 上传的文件
   * @param { ratio } width/height 的比例
   * @param { cb } 回调函数
   * @return { boolean }
   */
  const verificationFilePixel = (file, ratio = 1.5, cb) => {
    const filePic = file;
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      const image = new Image();
      image.src = data as string;
      const width = image.width;
      const height = image.height;
      if (width / height === ratio) {
        cb && cb(true);
      } else {
        cb && cb(false);
        return false;
      }
    };
    reader.readAsDataURL(filePic);
  };

  /**
   * @description 文件重命名&下载
   * @param { filePath } 文件地址
   * @param { fileName } 文件名
   */
  const downloadFile = (filePath: string, fileName?: string): void => {
    /* #ifdef H5 */
    if (fileName) {
      axios
        .get(filePath, {
          responseType: 'blob'
        })
        .then(res => {
          const blob = new Blob([res as unknown as BlobPart]);
          const href = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.setAttribute('href', href);
          a.setAttribute('download', fileName);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(href);
        });
    } else {
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
    /* #endif */

    /* #ifndef H5 */
    uni.downloadFile({
      url: filePath,
      success(res) {
        uni.saveFile({
          tempFilePath: res.tempFilePath,
          success() {
            uni.showToast({ title: '保存成功', icon: 'none' });
          },
          fail() {
            uni.showToast({ title: '保存失败', icon: 'none' });
          }
        });
      },
      fail() {
        uni.showToast({ title: '下载失败', icon: 'none' });
      }
    });
    /* #endif */
  };

  return {
    uploadFile,
    getFileSuffix,
    verificationFilePixel,
    getPreviewUrl,
    downloadOSSFile
  };
};
