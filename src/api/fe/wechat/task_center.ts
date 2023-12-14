import { http } from '@/utils/http';

const baseApi = '/fe/wechat/personal_center';

export interface ITask {
  workerName: string;
  mobile: string;
  idCardReverse: string;
  idCardNo: string;
  idCardFront: string;
  appealStatus: string;
}
export interface ITaskParam {
  status: string;
  page?: number;
  pageSize?: number;
  taskName?: string;
}
/* 任务中心 - 获取任务列表 */
export const getTaskList = (params: ITaskParam): Promise<ITask> => {
  return http.request('get', `${baseApi}`, { params });
};
