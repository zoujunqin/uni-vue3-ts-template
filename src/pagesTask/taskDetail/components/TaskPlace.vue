<template>
  <view v-if="data.address">
    <view class="section-title hx-mb-[10px]"> 任务地点 </view>
    <map
      class="hx-h-[186px] hx-w-full hx-mb-[16px]"
      :latitude="latitude"
      :longitude="longitude"
      :markers="markers"
    />
  </view>
</template>

<script setup lang="ts">
import { PropType, shallowRef, watch } from 'vue';

import { getGeo } from '@/api/amap';
import { ITaskDetail } from '@/api/fe/wechat/task';

const props = defineProps({
  data: {
    type: Object as PropType<ITaskDetail>,
    default: () => ({})
  }
});

const markers = shallowRef<any>([]);
const longitude = shallowRef(0);
const latitude = shallowRef(0);

const getPositionByAddress = () => {
  const { address } = props.data;

  getGeo({ address: address }).then(res => {
    const { location } = res.data.geocodes[0];
    const [lng, lat] = location.split(',');
    longitude.value = lng;
    latitude.value = lat;
    markers.value = [
      {
        id: 0,
        latitude: lat,
        longitude: lng,
        // iconPath: './resources/placeholder.png', //图标路径
        width: 20,
        height: 20,
        callout: {
          //可根据需求是否展示经纬度
          content: address,
          color: '#000',
          bgColor: '#fff',
          padding: 10,
          borderRadius: 15,
          display: 'ALWAYS'
        }
      }
    ];
  });
};

watch(props, getPositionByAddress);
</script>
