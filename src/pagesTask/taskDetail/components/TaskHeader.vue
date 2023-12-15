<template>
  <view class="hx-flex hx-mb-[18px]">
    <text
      class="hx-text-color-title hx-text-[22px] hx-font-[600] hx-leading-[36px] hx-mr-[8px] hx-max-w-[176px] hx-whitespace-pre-wrap"
    >
      {{ data.taskName }}
    </text>
    <ProTags
      class="hx-mt-[8px]"
      size="mini"
      :text="data.statusName"
      :type="TASK_STATUS_MAP[data.status]?.type"
    />
    <text
      class="hx-mt-[3px] hx-flex-1 hx-text-right hx-text-color-primary hx-text-[20px] hx-font-[600] hx-leading-[30px]"
    >
      {{ data.salaryMin + '~' + data.salaryMax + data.costTypeName }}
    </text>
  </view>

  <view class="hx-flex hx-items-center hx-mb-[16px]">
    <view class="hx-flex hx-items-center hx-mr-[16px]">
      <image
        class="hx-w-[16px] hx-h-[16px] hx-mr-[4px] hx-mb-[1px]"
        src="@/static/task-detail/position.png"
      />
      <text
        class="hx-text-[14px] hx-font-[400] hx-leading-[14px] hx-text-text-color"
      >
        {{ data.city + ' ' + data.area }}
      </text>
    </view>
    <view class="hx-flex hx-items-center">
      <image
        class="hx-w-[16px] hx-h-[16px] hx-mr-[4px] hx-mb-[1px]"
        src="@/static/task-detail/education.png"
      />
      <text
        class="hx-text-[14px] hx-font-[400] hx-leading-[14px] hx-text-text-color"
      >
        {{ data.educationName }}
      </text>
    </view>
  </view>

  <view class="hx-flex hx-items-center">
    <ProTags class="hx-mr-[10px]" :text="data.taskTypeName" type="info" />
  </view>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { ITaskDetail } from '@/api/fe/wechat/task';
import { TASK_STATUS_MAP } from '@/constant/taskDetail';

defineProps({
  data: {
    type: Object as PropType<ITaskDetail>,
    default: () => ({})
  }
});
</script>
