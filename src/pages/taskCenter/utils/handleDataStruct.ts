import { ITask } from '@/api/fe/wechat/task_center';
import { hyphenAB } from '@/utils/processingText';

export const getHandledTaskInfo = (row: ITask) => {
  const {
    taskSalaryMin,
    taskSalaryMax,
    costTypeName,
    taskTypeName,
    taskName,
    taskContent
  } = row;
  return {
    ...row,
    cost: hyphenAB(taskSalaryMin, taskSalaryMax) + costTypeName,
    title: taskName,
    desc: taskContent,
    tag: taskTypeName
  };
};
