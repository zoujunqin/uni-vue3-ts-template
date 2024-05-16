import pagesJson from '@/pages.json';

export function getPages() {
  return pagesJson.pages;
}

export function getPortalUrl() {
  const portalPath = pagesJson.pages[0].path;
  return addSlash(portalPath);
}

export function getCurrentRoute() {
  const routes = getCurrentPages();
  return routes[routes.length - 1];
}

export function addSlash(path: string) {
  return path.startsWith('/') ? path : '/' + path;
}
