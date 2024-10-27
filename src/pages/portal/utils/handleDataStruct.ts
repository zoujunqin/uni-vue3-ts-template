import { hyphenABEqualityA } from '@/utils/text';

export const getHandledTaskInfo = row => {
  const {
    taskSalaryMin,
    taskSalaryMax,
    costTypeName,
    taskTypeName,
    taskName,
    taskDescription
  } = row;
  return {
    ...row,
    cost:
      hyphenABEqualityA(taskSalaryMin, taskSalaryMax) + '元/' + costTypeName,
    title: taskName,
    desc: taskDescription,
    tag: taskTypeName
  };
};
