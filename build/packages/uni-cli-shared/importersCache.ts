import { MAIN_PACKAGE_NAME } from './const';
import { getSubPackageRoots } from './utils';

export const importersCache = {};

export function updateImportersCache(id, val) {
  importersCache[id] ||= [];

  if (!importersCache[id].includes(val)) {
    importersCache[id].push(val);
  }
}

export function findReferRoots(id) {
  let roots = [];
  const checkedIds = [];
  const subPackageRoots = getSubPackageRoots();

  roots.push(...findRefer({ id, checkedIds, cache: importersCache }));

  roots = roots.map(
    root =>
      subPackageRoots.find(subPackageRoot => root.startsWith(subPackageRoot)) ||
      MAIN_PACKAGE_NAME
  );

  return Array.from(new Set(roots));
}

function findRefer({ id, checkedIds, cache }) {
  const roots = [];
  if (cache[id]) {
    checkedIds.push(id);

    for (const importer of cache[id]) {
      // 避免重复依赖导致的循环引用
      if (checkedIds.includes(importer)) {
        continue;
      }
      if (cache[importer]) {
        roots.push(...findRefer({ id: importer, checkedIds, cache }));
      } else {
        roots.push(importer);
      }
    }
  } else {
    roots.push(MAIN_PACKAGE_NAME);
  }

  return roots;
}
