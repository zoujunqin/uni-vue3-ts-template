import { MD5, AES, enc, mode, pad } from 'crypto-js';
const key = import.meta.env.VITE_CRYPTO_KEY;
const iv = import.meta.env.VITE_CRYPTO_IV;

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
    <any>{
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
