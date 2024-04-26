// 为了 uv 某些组件嵌套问题做兼容, eg: uv-checkbox-group, uv-checkbox
import { getCurrentInstance, onMounted, ref } from 'vue';

export const useNextedCompatible = (name: string) => {
  const parentInstance = ref();
  const { ctx } = getCurrentInstance();

  ctx.children = [];
  // 这里 name 为 uv-checkbox-group 是为了 uv-checkbox 内部的查找机制
  ctx.$options = Object.assign(ctx.$options || {}, {
    name
  });

  // 更新 uv-checkbox 的 parent 为 uv-checkbox-group, 保证执行原有逻辑
  function updateUvCheckboxGroupParent() {
    parentInstance.value.children = ctx.children.map(child => {
      return Object.assign(child, { parent: parentInstance.value });
    });
  }

  onMounted(() => {
    // 将 uv-checkbox-group 的数据暂时绑定到 pro-checkbox-group, uv-checkbox 就能获取到 uv-checkbox-group 的数据
    const { $props, $data } = parentInstance.value;
    const mergedData = { ...$props, ...$data };
    for (const key in mergedData) {
      ctx[key] = mergedData[key];
    }

    // 重写 updateParentData 方法, 不然没次执行都会变更 child 的 parent 导致错误
    ctx.children.forEach(child => {
      const originUpdateParentData = child.updateParentData;

      if (originUpdateParentData) {
        child.updateParentData = function () {
          originUpdateParentData();
          updateUvCheckboxGroupParent();
        };
      }

      // 重新初始化数据
      child?.init();
    });
  });

  return { parentInstance };
};
