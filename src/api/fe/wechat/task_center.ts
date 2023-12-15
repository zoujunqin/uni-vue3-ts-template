import { TASK_STATUS } from '@/constant/taskDetail';
import { http } from '@/utils/http';

const baseApi = '/fe/wechat/task_center';

export interface ITask {
  costTypeName: string;
  taskContent: string;
  taskId: number;
  taskSalaryMax: number;
  taskSalaryMin: number;
  status: (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
  statusName: string;
  taskName: string;
  taskTypeName: string;
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
