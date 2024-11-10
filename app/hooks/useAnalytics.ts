import { isDevMode } from "@/consts/env";
import { getAnalytics, logEvent as firebaseLogEvent } from "firebase/analytics";

const useAnalytics = () => {
  const analytics = getAnalytics();

  const logEvent = (
    eventName: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    eventParam: Record<string, any>
  ) => {
    if (isDevMode) return;
    firebaseLogEvent(analytics, eventName, eventParam);
  };

  return { logEvent };
};

export default useAnalytics;
