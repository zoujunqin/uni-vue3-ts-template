import { TASK_STATUS } from '@/constant/taskDetail';
import { http } from '@/utils/http';

const baseApi = '/fe/wechat/task';

export interface ITaskDetail {
  address: string;
  ageMax: number;
  ageMin: number;
  area: string;
  areaCode: number;
  beginDate: string;
  city: string;
  cityCode: number;
  content: string;
  costTypeName: string;
  education: string;
  educationName: string;
  endDate: string;
  gender: string;
  genderName: string;
  id: number;
  imgUrl: string;
  individualContractName: string;
  individualContractPath: string;
  izAgeRestrict: string;
  province: string;
  provinceCode: number;
  salaryMax: number;
  salaryMin: number;
  undertakingStatus: (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
  undertakingStatusName: string;
  taskName: string;
  taskTypeName: string;
  description: string;
}
/* 获取任务详情 */
export const getTaskDetail = (id: number): Promise<ITaskDetail> => {
  return http.request('get', `${baseApi}/${id}`);
};

export interface IApplyReturn {
  izSignProtocol: string;
  izRealname: string;
  izFaceAuthenticated: string;
}
/* 申请任务 */
export const applyTask = (id: number): Promise<IApplyReturn> => {
  return http.request('get', `${baseApi}/${id}/apply`);
};
