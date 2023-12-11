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
          :card-info="getRow(row)"
          @tap="navToTaskDetail(row)"
        />
      </template>
    </ProScrollList>
  </ProPage>

  <!--  任务类型  -->
  <ProDropDownPopupWrapper
    ref="proDropDownPopupRef"
    sign="sign"
    @popup-change="handlePopupChange"
  >
    <IndustrySelect v-model="industryList" />
  </ProDropDownPopupWrapper>

  <!-- 地点选择 -->
  <ProAreaPicker
    v-model="areaList"
    ref="proAreaPickerRef"
    @close="handleAreaPickerClose"
  />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { getAddedMemberList } from '@/api/test';
import { useHandler } from './hooks/useHandler';
import IndustrySelect from './components/IndustrySelect.vue';

const { navToTaskDetail, handleInputConfirm } = useHandler();

const proDropDownPopupRef = shallowRef();
const openIndustryPopup = (val: boolean) => {
  proDropDownPopupRef.value[val ? 'open' : 'close']();
  proAreaPickerRef.value.close();
};
const industryList = shallowRef([]);

const proAreaPickerRef = shallowRef();
const openAreaPicker = (val: boolean) => {
  proAreaPickerRef.value[val ? 'open' : 'close']();
  proDropDownPopupRef.value.close();
};
const areaList = shallowRef([150000, 150100, 150102]);

const conditionActive = shallowRef('');
const handlePopupChange = ({ show }: { show: boolean }) => {
  !show && (conditionActive.value = '');
};
const handleAreaPickerClose = () => {
  conditionActive.value = '';
};

const getRow = row => {
  return {
    ...row,
    cost: row.addMonth,
    title: row.serviceContract,
    desc: row.supplierName,
    tag: row.name
  };
};

onPullDownRefresh(() => {});
</script>
