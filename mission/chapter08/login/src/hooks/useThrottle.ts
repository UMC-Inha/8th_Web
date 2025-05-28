import { useRef } from "react";

function useThrottle(callback: () => void, delay: number) {
  const lastExecuted = useRef(0);

  return () => {
    const now = Date.now();
    if (now - lastExecuted.current >= delay) {
      lastExecuted.current = now;
      callback();
    }
  };
}

export default useThrottle;
