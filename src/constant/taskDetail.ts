import { defineConstants } from '@/utils/constant';

export const { TASK_STATUS, TASK_STATUS_MAP, TASK_STATUS_LIST } =
  defineConstants(
    [
      {
        label: '待确认',
        value: 'unconfirmed',
        type: 'warning'
      },
      {
        label: '承接中',
        value: 'underTake',
        type: 'success'
      },
      {
        label: '已完结',
        value: 'completed',
        type: 'disabled'
      }
    ] as const,
    'TASK_STATUS',
    'value'
  );
