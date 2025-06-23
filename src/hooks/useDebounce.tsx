import { useState, useEffect, useCallback } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const handler = useCallback(() => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(handler, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [handler, delay]);

  return debouncedValue;
}

export default useDebounce;
