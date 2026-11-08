import { useCallback, useEffect, useState } from "react";

export const useCountdown = (durationMs: number) => {
  const [endAt, setEndAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (endAt === null) return;

    const tick = () => {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) clearInterval(id);
    };
    const id = setInterval(tick, 1000);
    tick();

    return () => clearInterval(id);
  }, [endAt]);

  const start = useCallback(() => {
    setRemaining(Math.ceil(durationMs / 1000));
    setEndAt(Date.now() + durationMs);
  }, [durationMs]);

  return { remaining, isRunning: remaining > 0, start };
};
