import { useEffect, useState } from "react";

/**
 * 1초마다 갱신되는 현재 시각. clockOffset 만큼 보정해 서버 기준 시각을 돌려준다.
 */
const useNow = (clockOffset: number) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return now + clockOffset;
};

export default useNow;
