<template>
  <view class="hx-flex hx-mb-[18px]">
    <text
      class="hx-text-color-title hx-text-[22px] hx-font-[600] hx-leading-[36px] hx-mr-[8px] hx-max-w-[176px] hx-whitespace-pre-wrap"
    >
      {{ data.title }}
    </text>
    <ProTags
      class="hx-mt-[8px]"
      size="mini"
      :text="data.tag"
      :type="TASK_STATUS_MAP[data.tagStatus].type"
    />
    <text
      class="hx-mt-[3px] hx-flex-1 hx-text-right hx-text-color-primary hx-text-[20px] hx-font-[600] hx-leading-[30px]"
    >
      {{ data.cost }}
    </text>
  </view>

  <view class="hx-flex hx-items-center hx-mb-[16px]">
    <view class="hx-flex hx-items-center hx-mr-[16px]">
      <image
        class="hx-w-[16px] hx-h-[16px] hx-mr-[4px] hx-mb-[1px]"
        src="@/static/local/task-detail/position.png"
      />
      <text
        class="hx-text-[14px] hx-font-[400] hx-leading-[14px] hx-text-text-color"
      >
        {{ data.address }}
      </text>
    </view>
    <view class="hx-flex hx-items-center hx-mr-[16px]">
      <image
        class="hx-w-[16px] hx-h-[16px] hx-mr-[4px] hx-mb-[2px]"
        src="@/static/local/task-detail/experience.png"
      />
      <text
        class="hx-text-[14px] hx-font-[400] hx-leading-[14px] hx-text-text-color"
      >
        {{ data.experience }}
      </text>
    </view>
    <view class="hx-flex hx-items-center">
      <image
        class="hx-w-[16px] hx-h-[16px] hx-mr-[4px] hx-mb-[1px]"
        src="@/static/local/task-detail/education.png"
      />
      <text
        class="hx-text-[14px] hx-font-[400] hx-leading-[14px] hx-text-text-color"
      >
        {{ data.education }}
      </text>
    </view>
  </view>

  <view class="hx-flex hx-items-center">
    <ProTags class="hx-mr-[10px]" :text="data.belong" type="info" />
    <ProTags :text="data.sector" type="info" />
  </view>
</template>
<script setup lang="ts">
import { TASK_STATUS_MAP } from '@/constant/taskDetail';

defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
});
</script>
