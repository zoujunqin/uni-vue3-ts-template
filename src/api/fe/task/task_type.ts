import { http } from '@/utils/http';

const baseApi = '/fe/task/task_type';

export interface ITreeTaskType {
  name: string;
  children: Array<ITreeSubTaskType>;
}

export interface ITreeSubTaskType {
  categoryName: string;
  description: string;
  id: number;
  name: string;
}
/* 获取任务类型 - 树形结构 */
export const getTreeTaskTypeList = (): Promise<Array<ITreeTaskType>> => {
  return http.request('get', `${baseApi}/tree`);
};
