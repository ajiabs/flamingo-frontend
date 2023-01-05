import { useCallback, useState } from 'react';

export default function useToggle() {
  const [value, setValue] = useState(false);
  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle];
}
