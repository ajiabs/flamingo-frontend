import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const getCookies = (value = '') => cookies.get(value);
export const removeCookies = (value = '') => {
  cookies.remove(value, { sameSite: 'Strict' });
};
export const setCookies = (key = '', value = '') => {
  cookies.set(key, value, {
    path: '/',
    sameSite: 'Strict',
  });
};
