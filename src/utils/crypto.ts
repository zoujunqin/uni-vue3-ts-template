import { MD5, AES, enc, mode, pad } from 'crypto-js';
const key = '2ccdb1306af6476b8a2a289110420502';
const iv = '138f54643bc146cr';

const SECRET_KEY = enc.Utf8.parse(key);
const SECRET_IV = enc.Utf8.parse(iv);

/** AES加密 */
export const encryptString = (text: string): string => {
  const dataHex = enc.Utf8.parse(text);
  const encrypted = AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: mode.CBC,
    padding: pad.Pkcs7
  });
  return MD5(encrypted.ciphertext.toString().toLocaleUpperCase()).toString();
};

export const decryptString = (text: string) => {
  const bytes = AES.decrypt(
    {
      ciphertext: enc.Hex.parse(text)
    },
    SECRET_KEY,
    {
      iv: SECRET_IV,
      mode: mode.CBC,
      padding: pad.Pkcs7
    }
  );
  return bytes.toString(enc.Utf8);
};
