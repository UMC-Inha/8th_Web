import { useCallback, useRef } from "react";

export default function useThrottleCallback(
  callback: () => void,
  delay: number
) {
  const readyRef = useRef(true);

  const throttledFn = useCallback(() => {
    if (!readyRef.current) return;

    callback();
    readyRef.current = false;

    setTimeout(() => {
      readyRef.current = true;
    }, delay);
  }, [callback, delay]);

  return throttledFn;
}
