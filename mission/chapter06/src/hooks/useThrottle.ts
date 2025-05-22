import { useEffect, useState, useRef } from "react";

export default function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(0);

  useEffect(() => {
    const now = Date.now();
    if (now - lastExecuted.current >= delay) {
      setThrottledValue(value);
      lastExecuted.current = now;
    }
  }, [value, delay]);

  return throttledValue;
}
