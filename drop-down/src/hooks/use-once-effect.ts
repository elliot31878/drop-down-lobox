import { useEffect, useRef } from "react";

interface UseOnceEffectProps {
  effect: () => void | (() => void);
}

export function useOnceEffect({ effect }: UseOnceEffectProps) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
