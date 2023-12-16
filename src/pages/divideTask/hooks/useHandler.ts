import { onPullDownRefresh } from '@dcloudio/uni-app';
import { shallowRef, watch } from 'vue';

import TaskTypeDropDownPopup from '../components/TaskTypeDropDownPopup.vue';

import { ITask } from '@/api/fe/wechat/task_center';
import ProAreaPicker from '@/components/ProAreaPicker/ProAreaPicker.vue';
import ProScrollList from '@/components/ProScrollList/ProScrollList.vue';

const TASK_TYPE = 'taskType';
const AREA = 'area';
type ConditionActive = typeof TASK_TYPE | typeof AREA | null;

export const useHandler = () => {
  /* 任务类型 */
  const taskTypeList = shallowRef<Array<number>>([]);
  const taskTypeDropDownPopupRef =
    shallowRef<InstanceType<typeof TaskTypeDropDownPopup>>();

  /* 地区选择 */
  const areaList = shallowRef<Array<number>>([]);
  const proAreaPickerRef = shallowRef<InstanceType<typeof ProAreaPicker>>();

  /* 条件 */
  const conditionList = [
    {
      name: TASK_TYPE,
      title: '任务类型',
      ref: taskTypeDropDownPopupRef
    },
    {
      name: AREA,
      title: '地点',
      ref: proAreaPickerRef
    }
  ];
  const conditionActive = shallowRef<ConditionActive>(null);
  const resetConditionActive = () => (conditionActive.value = null);
  watch(conditionActive, (newVal: ConditionActive, oldVal: ConditionActive) => {
    for (const item of conditionList) {
      newVal === item.name && item.ref.value?.open();
      oldVal === item.name && item.ref.value?.close();
    }
  });

  const handleTaskTypePopupChange = ({ show }: { show: boolean }) => {
    !show && resetConditionActive();
  };

  const proScrollListRef = shallowRef<InstanceType<typeof ProScrollList>>();
  const reload = () => {
    proScrollListRef.value?.reload();
  };

  /* 搜索输入 */
  const inputRef = shallowRef();
  const confirmedInputSearchValue = shallowRef('');
  const handleInputConfirm = (value: string) => {
    confirmedInputSearchValue.value = value;
    reload();
  };

  /* 拓展参数：搜索值 地区 任务类型 */
  const getExtendParams = () => {
    return {
      taskName: confirmedInputSearchValue.value,
      areaCode: areaList.value[2],
      taskTypeIds: taskTypeList.value.join(',')
    };
  };

  /* 跳转到任务详情 */
  const navToTaskDetail = (row: ITask) => {
    uni.navigateTo({
      url: `/pagesTask/taskDetail/index?id=${row.taskId}`
    });
  };

  onPullDownRefresh(() => {
    taskTypeList.value = [];
    areaList.value = [];
    inputRef.value.clearInput();
    handleInputConfirm('');
    uni.stopPullDownRefresh();
  });

  return {
    proScrollListRef,
    reload,

    inputRef,
    handleInputConfirm,
    getExtendParams,

    taskTypeList,
    taskTypeDropDownPopupRef,

    areaList,
    proAreaPickerRef,

    conditionList,
    conditionActive,
    handleTaskTypePopupChange,
    resetConditionActive,

    navToTaskDetail
  };
};
