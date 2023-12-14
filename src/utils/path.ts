export const resolvePath = (path: string) => {
  return /^\//.test(path) ? path : '/' + path;
};
