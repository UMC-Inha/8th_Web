import { useRef } from "react";

function useThrottle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  const lastCalled = useRef(0);

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCalled.current >= delay) {
      lastCalled.current = now;
      fn(...args);
    }
  };
}

export default useThrottle;
