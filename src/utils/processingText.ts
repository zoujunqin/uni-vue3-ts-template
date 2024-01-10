// 处理银行卡号码显示6212 6723 8322 673
export const handleGetBankNum = (value: string) => {
  return value.replace(/(.{4})/g, '$1 ');
};

//  * 保留前后四位 中间每4个*会有一个空格  6212 **** **** *** 0222
export const handleGetBankNumNoShow = (value: string) => {
  if (value && value.length > 8) {
    return `${value.substring(0, 4)} ${'*'
      .repeat(value.length - 8)
      .replace(/(.{4})/g, `$1 `)}${value.length % 4 ? ' ' : ''}${value.slice(
      -4
    )}`;
  }
  return value;
};

/* 连字符连接 AB */
export const hyphenAB = (
  varA: number | string,
  varB: number | string,
  hyphen = '~'
) => {
  if (varA && varB) return varA + hyphen + varB;
  else return varA || varB;
};

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
