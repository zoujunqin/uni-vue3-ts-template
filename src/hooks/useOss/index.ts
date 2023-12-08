// @ts-nocheck

import axios from 'axios';
import AliOss from 'ali-oss';
import { getOssPolicy, getOssCredential } from '@/api/system/oss';
import { OssUploadConfig, OSSCredentialConfig, ModuleType } from './types';
import { getUUID } from '@/utils';

const OSS_CREDENTIAL_KEY = 'oss_creadential_key';

export const useOss = () => {
  const uploadFile = (
    module: ModuleType,
    filePath: string,
    fileName?: string
  ) => {
    return new Promise(async (resolve, reject) => {
      const type = getFileSuffix(filePath);
      const ossConfig: OssUploadConfig = await getOssPolicy({
        module,
        type,
        fileName: fileName ?? 'mp-' + getUUID()
      });

      const { accessid, host, key, policy, signature } = ossConfig;
      uni.uploadFile({
        url: host,
        filePath: filePath,
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
    const client = await getSignatureClient();
    const response = {};
    response['Content-Disposition'] = `inline`;
    const url = client.signatureUrl(fileRelativePath, { response });
    return url;
  };

  /**
   * @description 下载文件
   * @param fileRelativePath 文件相对地址 | 文件名
   * @param fileRename 文件重命名
   * @return void
   */

  const downloadOSSFile = async (
    fileRelativePath: string,
    fileRename?: string
  ) => {
    const client = await getSignatureClient();
    const response = {};
    if (fileRename) {
      response['Content-Disposition'] =
        `attachment; filename=${encodeURIComponent(fileRename)}`;
    }
    const url = client.signatureUrl(fileRelativePath, { response });
    downloadFile(url);
  };

  const getSignatureClient = async () => {
    const ossCredentialConfig = await getOssCredentialConfig();
    const {
      regionId: region,
      accessKeyId,
      accessKeySecret,
      securityToken: stsToken,
      bucketName: bucket
    } = ossCredentialConfig;
    const params = {
      region,
      accessKeyId,
      accessKeySecret,
      stsToken,
      bucket,
      secure: true,
      refreshSTSToken: async () => {
        const refreshToken = await getOssCredential();
        const { accessKeyId, accessKeySecret, securityToken } = refreshToken;
        return { accessKeyId, accessKeySecret, stsToken: securityToken };
      }
    };
    const client = new AliOss(params);
    return client;
  };

  /**
   * @description 获取临时凭证
   */

  const getOssCredentialConfig = async () => {
    let ossCredentialConfig: OSSCredentialConfig | any =
      uni.getStorageSync(OSS_CREDENTIAL_KEY);
    if (ossCredentialConfig && ossCredentialConfig.expiration) {
      const now = new Date().getTime();
      const expirationTime = new Date(ossCredentialConfig.expiration).getTime();
      ossCredentialConfig = now > expirationTime ? null : ossCredentialConfig;
    }
    if (!ossCredentialConfig) {
      ossCredentialConfig = await getOssCredential();
      uni.setStorageSync(OSS_CREDENTIAL_KEY, ossCredentialConfig);
    }
    return ossCredentialConfig;
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
  };

  return {
    uploadFile,
    getFileSuffix,
    verificationFilePixel,
    getPreviewUrl,
    downloadOSSFile
  };
};
