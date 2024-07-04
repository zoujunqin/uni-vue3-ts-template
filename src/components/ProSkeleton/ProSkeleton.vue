<template>
  <view class="pro-skeleton hx-relative">
    <view v-if="props.loading">
      <view
        v-for="(rectInfo, index) in rects"
        class="hx-absolute hx-bg-white hx-rounded-[6px] hx-shadow-card"
        :key="index"
        :class="props.animate ? 'pro-skeleton--animation' : ''"
        :style="getStyle(rectInfo)"
      />
      <view
        v-for="(rectInfo, index) in circles"
        class="hx-absolute hx-bg-white hx-rounded-full hx-shadow-card"
        :key="index"
        :class="props.animate ? 'pro-skeleton--animation' : ''"
        :style="getStyle(rectInfo)"
      />
    </view>

    <view :class="props.loading ? 'hx-opacity-0' : ''">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, shallowRef } from 'vue';

const props = defineProps({
  loading: Boolean,
  animate: {
    type: Boolean,
    default: true
  },
  rootSelector: {
    type: String,
    default: '.skeleton'
  }
});

const rects = shallowRef<Array<UniNamespace.NodeInfo>>([]);
const circles = shallowRef<Array<UniNamespace.NodeInfo>>([]);
const rootNode = shallowRef<UniNamespace.NodeInfo>({});

const getStyle = (rectInfo: UniNamespace.NodeInfo) => {
  const { left, top, width, height, dataset } = rectInfo;
  const { skeletonColor, skeletonWidth, skeletonHeight } = dataset;

  const { left: rootLeft, top: rootTop } = rootNode.value;

  return {
    left: left - rootLeft + 'px',
    top: top - rootTop + 'px',
    width: skeletonWidth || width + 'px',
    height: skeletonHeight || height + 'px',
    backgroundColor: `${skeletonColor} !important`
  };
};

const currentInsurance = getCurrentInstance();
onMounted(() => {
  const currentQuery = uni.createSelectorQuery().in(currentInsurance);
  currentQuery
    .select('.pro-skeleton')
    .boundingClientRect(boundingRect => {
      rootNode.value = boundingRect as UniNamespace.NodeInfo;
    })
    .exec();

  const { rootSelector } = props;

  const query = uni.createSelectorQuery().in(currentInsurance.root);
  query
    .selectAll(`${rootSelector} >>> .skeleton-rect`)
    .boundingClientRect(boundingRects => {
      rects.value = boundingRects as Array<UniNamespace.NodeInfo>;
    });
  query
    .selectAll(`${rootSelector} >>> .skeleton-circle`)
    .boundingClientRect(boundingRects => {
      circles.value = boundingRects as Array<UniNamespace.NodeInfo>;
    });
  query.exec();
});
</script>

<script lang="ts">
export default {
  options: { name: 'ProSkeleton', virtualHost: true }
};
</script>

<style scoped>
.pro-skeleton--animation {
  background: linear-gradient(90deg, #f1f2f4 25%, #e6e6e6 37%, #f1f2f4 50%);
  background-color: #e6e6e6;
  background-size: 400% 100%;
  animation: skeleton 1.8s linear infinite;
}

@keyframes skeleton {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
