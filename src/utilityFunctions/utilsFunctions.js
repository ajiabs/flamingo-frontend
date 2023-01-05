/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
import { ENCRYPT_SECERET_KEY } from '../redux/apiConstants';

const CryptoJS = require('crypto-js');

export const Encrypt = (value) => {
  const ciphertext = CryptoJS.AES.encrypt(value, ENCRYPT_SECERET_KEY).toString();
  // const encodedValue = encodeURIComponent(ciphertext);
  const encodedValue = ciphertext
    .replace(/\+/g, 'p1L2u3S')
    .replace(/\//g, 's1L2a3S4h')
    .replace(/=/g, 'e1Q2u3A4l');
  return encodedValue;
};
export const Decrypt = (value) => {
  // const decodeText = decodeURIComponent(value);
  const decodeText = value
    .replace(/p1L2u3S/g, '+')
    .replace(/s1L2a3S4h/g, '/')
    .replace(/e1Q2u3A4l/g, '=');
  const bytes = CryptoJS.AES.decrypt(decodeText, ENCRYPT_SECERET_KEY);
  const decodedValue = bytes.toString(CryptoJS.enc.Utf8);
  return decodedValue;
};

export const NumFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return `${(num / 1000).toFixed(2)}K`; // convert to K for number from > 1000 < 1 million
  }
  if (num > 1000000) {
    return `${(num / 1000000).toFixed(2)}M`; // convert to M for number from > 1 million
  }
  if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
  return num;
};
// eslint-disable-next-line max-len
export const CapitalizeFirstLetter = (strs) =>
  strs.charAt(0).toUpperCase() + strs.slice(1).toLowerCase();

export const DateFormatter = (date, type) => {
  const newDate = new Date(date);
  switch (type) {
    case 'toString':
      return newDate.toString(); // Fri Jul 02 2021 14:03:54 GMT+0100 (British Summer Time)
    case 'toDateString':
      return newDate.toDateString(); // Fri Jul 02 2021
    case 'toLocaleString':
      return newDate.toLocaleString(); // 7/2/2021, 2:05:07 PM
    case 'toLocaleDateString':
      return newDate.toLocaleDateString(); // 7/2/2021
    case 'toGMTString':
      return newDate.toGMTString(); // Fri, 02 Jul 2021 13:06:02 GMT
    case 'toUTCString':
      return newDate.toUTCString(); // Fri, 02 Jul 2021 13:06:28 GMT
    case 'toISOString':
      return newDate.toISOString(); // 2021-07-02T13:06:53.422Z
    default:
      return newDate;
  }
};
