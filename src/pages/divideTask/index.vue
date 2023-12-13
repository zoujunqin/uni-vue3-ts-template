<template>
  <ProPage
    show-navbar
    show-tabbar
    navbar-title="推荐任务"
    class="hx-bg-[#F7F8FA] hx-flex hx-flex-col"
  >
    <ProPageHeader
      class="hx-relative hx-z-[11]"
      :bg-img-url="import('@http/task/task-bg.png')"
      @input-confirm="handleInputConfirm"
    >
      <template #bottom>
        <ProConditionGroup v-model="conditionActive" sign="sign">
          <ProCondition
            name="taskType"
            title="任务类型"
            @change="openIndustryPopup"
          />
          <ProCondition name="area" title="地点" @change="openAreaPicker" />
        </ProConditionGroup>
      </template>
    </ProPageHeader>

    <ProScrollList :fetch="() => {}" class="hx-flex-1 hx-pb-[10px]">
      <template #default="{ row }">
        <ProTaskCard
          id="card"
          class="hx-mt-[10px]"
          :card-info="row"
          @tap="navToTaskDetail(row)"
        />
      </template>
    </ProScrollList>
  </ProPage>

  <!--  任务类型  -->
  <IndustryDropDownPopup
    ref="industryDropDownPopupRef"
    sign="sign"
    v-model="industryList"
    @popup-change="handlePopupChange"
  />

  <!-- 地点选择 -->
  <ProAreaPicker
    v-model="areaList"
    ref="proAreaPickerRef"
    @close="handleAreaPickerClose"
  />
</template>

<script setup lang="ts">
import { useHandler } from './hooks/useHandler';
import IndustryDropDownPopup from './components/IndustryDropDownPopup.vue';

const {
  industryList,
  industryDropDownPopupRef,
  openIndustryPopup,

  areaList,
  proAreaPickerRef,
  openAreaPicker,

  conditionActive,
  handlePopupChange,
  handleAreaPickerClose,

  navToTaskDetail,
  handleInputConfirm
} = useHandler();
</script>
