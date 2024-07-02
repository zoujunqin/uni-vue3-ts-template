<template>
  <ProPage
    class="remuneration-container hx-bg-white hx-flex hx-flex-col"
    navbar-title="收入明细"
    show-navbar
  >
    <ProPageHeader
      ref="proPageHeaderRef"
      v-model="inputSearchValue"
      :readonly="true"
      class="hx-relative hx-z-[11]"
      placeholder="请选择企业"
      @inputClick="handleInputClick"
    >
      <template #bottom>
        <ProCondition
          v-model="conditionStatus"
          :title="monthDate"
          name="remunerationType"
          @change="openDate"
        />
      </template>
    </ProPageHeader>
    <ProScrollList
      ref="proScrollListRef"
      :fetch="getPersonalCenterIncomeList"
      :extend-params="getExtendParams()"
      class="hx-h-full hx-pb-[10px] hx-pt-[10px] hx-box-border hx-bg-bg-color-grey"
    >
      <template #default="{ row }">
        <view
          class="hx-flex hx-items-center hx-justify-between hx-bg-white hx-p-[16px_12px] hx-mb-[10px]"
          @click="handleLookDetails(row?.commissionDetailId)"
        >
          <p class="remuneration-title hx-truncate">
            {{ row?.customerName }}
          </p>
          <view class="hx-flex hx-items-center">
            <span class="remuneration-money">
              +{{ row?.finalPayingAmount }}元
            </span>
            <image
              :src="import('@http/person/arrow-right.svg')"
              class="hx-w-[18px] hx-h-[18px]"
            />
          </view>
        </view>
      </template>
    </ProScrollList>
    <ProDateTimePicker
      v-model:refer="testRef"
      ref="datetimePickerRef"
      v-model="monthDatetime"
      mode="year-month"
      @close="handleCloseDate"
      @confirm="handleGetPersonalCenterIncomeList"
    />
    <ProPicker
      ref="proPickerRef"
      :columns="pickerValue"
      cancelText="重置"
      keyName="customerName"
      @cancel="handlePickerCancel"
      @confirm="handlePickerConfirm"
    />
  </ProPage>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';

import {
  getPersonalCenterIncomeCustomer,
  getPersonalCenterIncomeList
} from '@/api/fe/wechat/personal_center';
import { handleDealTimestamp } from '@/utils/date';

const formData = ref({
  salaryIssueMonth: '',
  customerId: ''
});

const monthDatetime = ref(new Date());
const monthDate = computed(() => {
  return handleDealTimestamp(monthDatetime.value);
});

const customerList = ref<Array<any>>([]);
getPersonalCenterIncomeCustomer().then(res => {
  customerList.value = res;
});
const pickerValue = computed(() => {
  return [customerList.value];
});

const proPickerRef = ref();
const handleInputClick = () => {
  if (customerList.value.length > 0) {
    proPickerRef.value.open();
  } else {
    return uni.showToast({ title: '暂无企业数据', icon: 'none' });
  }
};

const inputSearchValue = ref('');
const handlePickerConfirm = (e: any) => {
  inputSearchValue.value = e.value[0].customerName;
  formData.value.customerId = e.value[0].customerId;
  handleGetPersonalCenterIncomeList();
};

const handlePickerCancel = () => {
  inputSearchValue.value = '';
  formData.value.customerId = '';
  handleGetPersonalCenterIncomeList();
};

const testRef = ref();
const datetimePickerRef = ref();
const openDate = (bool: boolean) => {
  bool && datetimePickerRef.value?.open();
};
const conditionStatus = ref(false);
const handleCloseDate = () => {
  conditionStatus.value = false;
};
const proScrollListRef = ref();
const getExtendParams = () => {
  formData.value.salaryIssueMonth =
    monthDate.value.slice(0, 4) + '-' + monthDate.value.slice(5, 7);
  return formData.value;
};
const handleGetPersonalCenterIncomeList = () => {
  nextTick(() => {
    formData.value.salaryIssueMonth =
      monthDate.value.slice(0, 4) + '-' + monthDate.value.slice(5, 7);
    proScrollListRef.value?.reload();
  });
};

const handleLookDetails = (id: string) => {
  uni.navigateTo({
    url: `/pagesPerson/remuneration/remunerationDetails?id=${id}`
  });
};
</script>

<style lang="scss" scoped>
:deep(.pro-navbar) {
  background-color: #fff;
}

.remuneration-container {
  .remuneration-title {
    width: 220px;
    font-size: 16px;
    font-weight: 600;
    color: var(--hx-text-color-main);
  }

  .remuneration-text {
    margin-top: 8px;
    font-size: 14px;
    color: var(--hx-text-color);
  }

  .remuneration-money {
    font-size: 18px;
    font-weight: bold;
    color: var(--hx-text-color-theme);
  }
}
</style>
