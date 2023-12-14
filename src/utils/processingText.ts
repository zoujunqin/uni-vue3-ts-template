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
