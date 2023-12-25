// 处理银行卡号码显示
export const handleGetBankNum = (num: string) => {
  let dealBankNum = '';
  for (let i = 0; i < num.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      dealBankNum += ' ';
    }
    dealBankNum += num[i];
  }
  return dealBankNum;
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

//处理时间戳返回月份
export const handleDealTimestamp = (timestamp: Date) => {
  const now = new Date(timestamp);
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  return `${year}年` + `${month}月`;
};

//时间选择器展示格式
export const handleFormatter = (type: string, value: string) => {
  if (type === 'year') {
    return `${value}年`;
  }
  if (type === 'month') {
    return `${value}月`;
  }
  return value;
};
