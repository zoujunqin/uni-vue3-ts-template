export const useHandler = () => {
  const navToTaskDetail = (e, a) => {
    console.log(e, a);
  };

  return {
    navToTaskDetail
  };
};
