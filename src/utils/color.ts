export const rgbToHex = val => {
  //RGB(A)颜色转换为HEX十六进制的颜色值
  let r, g, b, a;
  const regRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/; //判断rgb颜色值格式的正则表达式，如rgba(255,20,10,.54)
  const rsa = val.replace(/\s+/g, '').match(regRgba);
  if (rsa) {
    r = parseInt(rsa[1]).toString(16);
    r = r.length == 1 ? '0' + r : r;
    g = (+rsa[2]).toString(16);
    g = g.length == 1 ? '0' + g : g;
    b = (+rsa[3]).toString(16);
    b = b.length == 1 ? '0' + b : b;
    a = +(rsa[5] ? rsa[5] : 1) * 100;
    return {
      hex: '#' + r + g + b,
      r: parseInt(r, 16),
      g: parseInt(g, 16),
      b: parseInt(b, 16),
      alpha: Math.ceil(a)
    };
  } else {
    return { hex: '无效', alpha: 100 };
  }
};

export const hexToRgb = val => {
  //HEX十六进制颜色值转换为RGB(A)颜色值
  // 16进制颜色值的正则
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 把颜色值变成小写
  let color = val.toLowerCase();
  let result = '';
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    const colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
    }
    result = 'rgb(' + colorChange.join(',') + ')';
    return {
      rgb: result,
      r: colorChange[0],
      g: colorChange[1],
      b: colorChange[2]
    };
  } else {
    result = '无效';
    return { rgb: result };
  }
};
