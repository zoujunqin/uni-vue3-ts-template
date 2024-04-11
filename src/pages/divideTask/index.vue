<template>
  <ProPage
    show-navbar
    show-tabbar
    navbar-title="推荐任务"
    class="hx-bg-[#F7F8FA] hx-flex hx-flex-col"
  >
    <ProPageHeader
      ref="proPageHeaderRef"
      class="hx-relative hx-z-[11]"
      :bg-img-url="import('@http/task/task-bg.png')"
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
      :fetch="getRecommendTaskList"
      :extend-params="getExtendParams()"
      ref="proScrollListRef"
      class="hx-flex-1"
    >
      <template #default="{ row }">
        <ProTaskCard
          id="card"
          class="hx-mt-[10px]"
          :card-info="getHandledTaskInfo(row)"
          @click="navToTaskDetail(row)"
        />
      </template>
    </ProScrollList>
  </ProPage>

  <!--  任务类型  -->
  <TaskTypeDropDownPopup
    v-model="taskTypeList"
    ref="taskTypeDropDownPopupRef"
    sign="sign"
    @popup-change="handleTaskTypePopupChange"
    @confirm="reload"
  />

  <!-- 地点选择 -->
  <ProAreaPicker
    v-model="areaList"
    ref="proAreaPickerRef"
    @close="resetConditionActive"
    @confirm="reload"
    cancelText="重置"
    @cancel="handlePickerCancel"
  />
</template>

<script setup lang="ts">
import { getHandledTaskInfo } from '../taskCenter/utils/handleDataStruct';

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
