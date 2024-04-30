<template>
  <view class="hx-h-full hx-flex hx-flex-col">
    <ProPageHeader
      ref="proPageHeaderRef"
      :bg-img-url="import('@http/task/task-bg.png')"
      class="hx-relative hx-z-[11]"
      @input-confirm="handleInputConfirm"
      @input-focus="resetConditionActive"
    >
      <template #bottom>
        <ProConditionGroup v-model="conditionActive" sign="sign">
          <ProCondition
            v-for="(item, index) in conditionList"
            :key="index"
            :name="item.name"
            :title="item.title"
          />
        </ProConditionGroup>
      </template>
    </ProPageHeader>

    <ProScrollList
      ref="proScrollListRef"
      :extend-params="getExtendParams()"
      :fetch="getRecommendTaskList"
      class="hx-flex-1"
    >
      <template #default="{ row }">
        <ProTaskCard
          id="card"
          :card-info="getHandledTaskInfo(row)"
          class="hx-mt-[10px]"
          @click="navToTaskDetail(row)"
        />
      </template>
    </ProScrollList>
  </view>

  <!--  任务类型  -->
  <TaskTypeDropDownPopup
    ref="taskTypeDropDownPopupRef"
    v-model="taskTypeList"
    sign="sign"
    @confirm="reload"
    @popup-change="handleTaskTypePopupChange"
  />

  <!-- 地点选择 -->
  <ProAreaPicker
    ref="proAreaPickerRef"
    v-model="areaList"
    cancelText="重置"
    @cancel="handlePickerCancel"
    @close="resetConditionActive"
    @confirm="reload"
  />
</template>

<script lang="ts" setup>
import { getHandledTaskInfo } from '../../utils/handleDataStruct';

import TaskTypeDropDownPopup from './components/TaskTypeDropDownPopup.vue';
import { useHandler } from './hooks/useHandler';

import { getRecommendTaskList } from '@/api/fe/wechat';

const {
  proScrollListRef,
  reload,

  proPageHeaderRef,
  handleInputConfirm,
  getExtendParams,

  taskTypeList,
  taskTypeDropDownPopupRef,
  handleTaskTypePopupChange,

  areaList,
  proAreaPickerRef,

  conditionList,
  conditionActive,
  resetConditionActive,
  handlePickerCancel,

  navToTaskDetail
} = useHandler();
</script>

<script lang="ts">
export default {
  options: { name: 'TaskRecommend', virtualHost: false }
};
</script>
