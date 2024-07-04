<template>
  <view class="hx-flex hx-mb-[18px]">
    <ProSkeletonRect width="176px" height="36px" margin-right="20px">
      <text
        class="hx-text-color-title hx-text-[22px] hx-font-[600] hx-leading-[36px] hx-mr-[8px] hx-max-w-[176px] hx-whitespace-pre-wrap"
      >
        {{ data.taskName }}
      </text>
    </ProSkeletonRect>

    <ProTags
      v-if="statusShow"
      :text="data.undertakingStatusName"
      :type="TASK_STATUS_MAP[data.undertakingStatus]?.type"
      class="hx-mt-[8px]"
      size="mini"
    />

    <ProSkeletonRect width="160px" height="30px">
      <text
        class="data-2 hx-mt-[3px] hx-flex-1 hx-text-right hx-text-color-primary hx-text-[20px] hx-font-[600] hx-leading-[30px]"
      >
        {{ hyphenAB(data.salaryMin, data.salaryMax) }}
        {{ data.costTypeName || '' }}
      </text>
    </ProSkeletonRect>
  </view>

  <ProSkeletonRect width="30px" height="16px" margin-bottom="16px">
    <view
      class="hx-flex hx-items-center hx-mb-[16px]"
      v-if="data.educationName"
    >
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
  </ProSkeletonRect>

  <view class="hx-flex hx-items-center">
    <ProSkeletonRect width="90px" height="26px" margin-right="8px">
      <ProTags
        v-if="data.taskTypeCategoryName"
        :text="data.taskTypeCategoryName"
        class="hx-mr-[10px]"
        type="info"
      />
    </ProSkeletonRect>

    <ProSkeletonRect width="90px" height="26px">
      <ProTags
        v-if="data.taskTypeName"
        :text="data.taskTypeName"
        class="hx-mr-[10px]"
        type="info"
      />
    </ProSkeletonRect>
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

<script lang="ts">
export default {
  options: { virtualHost: true }
};
</script>
