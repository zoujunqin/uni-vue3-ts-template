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
