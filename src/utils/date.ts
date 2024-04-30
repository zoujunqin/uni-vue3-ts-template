//处理时间戳返回年月
export const handleDealTimestamp = (timestamp: Date) => {
  const now = new Date(timestamp);
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  return `${year}年` + `${month}月`;
};

//处理时间戳返回年月日
export const handleDealTimestampDate = timestamp => {
  const now = new Date(timestamp);
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = (now.getDate() + 1).toString().padStart(2, '0');
  return `${year}-` + `${month}-` + `${day}`;
};
