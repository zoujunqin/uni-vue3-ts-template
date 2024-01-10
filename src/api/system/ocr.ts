import { http } from '@/utils/http';

const baseApi = '/system/ocr';

/* 身份证OCR识别 */
export const getOcrIdCard = (data: { imageUrl: string }) => {
  return http.request('post', `${baseApi}/id_card`, { data });
};
