<template>
  <view class="hx-flex hx-mb-[18px]">
    <text
      class="hx-text-color-title hx-text-[22px] hx-font-[600] hx-leading-[36px] hx-mr-[8px] hx-max-w-[176px] hx-whitespace-pre-wrap"
    >
      {{ data.taskName }}
    </text>
    <ProTags
      v-if="statusShow"
      :text="data.undertakingStatusName"
      :type="TASK_STATUS_MAP[data.undertakingStatus]?.type"
      class="hx-mt-[8px]"
      size="mini"
    />
    <text
      class="hx-mt-[3px] hx-flex-1 hx-text-right hx-text-color-primary hx-text-[20px] hx-font-[600] hx-leading-[30px]"
    >
      {{ hyphenAB(data.salaryMin, data.salaryMax) }}
      {{ data.costTypeName || '' }}
    </text>
  </view>

  <view class="hx-flex hx-items-center hx-mb-[16px]" v-if="data.educationName">
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

  <view class="hx-flex hx-items-center hx-mb-[10px]">
    <ProTags
      v-if="data.taskTypeCategoryName"
      :text="data.taskTypeCategoryName"
      class="hx-mr-[10px]"
      type="info"
    />
    <ProTags
      v-if="data.taskTypeName"
      :text="data.taskTypeName"
      class="hx-mr-[10px]"
      type="info"
    />
  </view>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import { ITaskDetail } from '@/api/fe/wechat/task';
import { TASK_STATUS_MAP } from '@/constant/taskDetail';
import { hyphenAB } from '@/utils/text';

defineProps({
  data: {
    type: Object as PropType<ITaskDetail>,
    default: () => ({})
  },
  statusShow: {
    type: Boolean,
    default: false
  }
});
</script>
