import { TASK_STATUS } from '@/constant/taskDetail';
import { http } from '@/utils/http';

const baseApi = '/fe/wechat/task';

export interface ITaskDetail {
  izApplied: string;
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
  individualContractName: string;
  izAgeRestrict: string;
  province: string;
  provinceCode: number;
  salaryMax: number;
  salaryMin: number;
  undertakingStatus: (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
  undertakingStatusName: string;
  taskName: string;
  taskTypeName: string;
  taskTypeCategoryName: string;
  description: string;
  taskDetail: string;
  remark: string;
  beginTime: string;
  endTime: string;
  customerName: string;
}
/* 获取任务详情 */
export const getTaskDetail = (params): Promise<ITaskDetail> => {
  return http.request('get', `${baseApi}`, { params }, { loading: false });
};

export interface IApplyReturn {
  izSignProtocol: string;
  izRealname: string;
  izFaceAuthenticated: string;
}
/* 申请任务 */
export const applyTask = (params): Promise<IApplyReturn> => {
  return http.request('get', `${baseApi}/apply`, { params });
};
