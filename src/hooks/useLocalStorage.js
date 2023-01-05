import { useState } from 'react';

export default function useLocalStorage() {
  const [item, setItem] = useState();
  function setLocalStorage(key = '', value = '') {
    localStorage.setItem(key, value);
  }
  function getLocalStorage(key = '') {
    const value = localStorage.getItem(key);
    setItem(value);
  }
  function removeLocalStorage(key = '') {
    localStorage.removeItem(key);
  }
  return { item, setLocalStorage, getLocalStorage, removeLocalStorage };
}
