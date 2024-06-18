// 为了 uv 某些组件嵌套问题做兼容, eg: uv-checkbox-group, uv-checkbox
import { getCurrentInstance, onMounted, shallowRef } from 'vue';

export const useNextedCompatible = () => {
  const uvInstance = shallowRef();
  const { ctx } = getCurrentInstance();

  ctx.children = [];

  // 更新 uv-checkbox 的 parent 为 uv-checkbox-group, 保证执行原有逻辑
  const updateContext = () => {
    /* 将 uv-checkbox-item 的 parent 指向 uv-checkbox */
    ctx.children.forEach(child => {
      child.parent = uvInstance.value;
    });
    /* 更新 uv-checkbox 的 children */
    uvInstance.value.children = ctx.children;
  };

  const init = () => {
    updateContext();

    // 将 uv-checkbox-group 的数据暂时绑定到 pro-checkbox-group, uv-checkbox 就能获取到 uv-checkbox-group 的数据
    const { $props, $data } = uvInstance.value;
    const mergedData = { ...$props, ...$data };

    for (const key in mergedData) {
      ctx[key] = mergedData[key];
    }
  };

  onMounted(() => {
    init();

    // 重写 updateParentData 方法, 不然没次执行都会变更 child 的 parent 导致错误
    ctx.children.forEach(child => {
      const originUpdateParentData = child.updateParentData;

      if (originUpdateParentData) {
        child.updateParentData = function () {
          originUpdateParentData();
          updateContext();
        };
      }

      // 重新初始化数据
      child?.init?.();
    });
  });

  return { ctx, uvInstance };
};
