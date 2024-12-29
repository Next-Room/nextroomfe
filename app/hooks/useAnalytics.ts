import {
  getAnalytics,
  logEvent as firebaseLogEvent,
  isSupported,
} from "firebase/analytics";
import { useEffect, useState } from "react";

import { isDevMode } from "@/consts/env";

const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<ReturnType<
    typeof getAnalytics
  > | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      isSupported()
        .then((supported) => {
          if (supported) {
            const analyticsInstance = getAnalytics();
            setAnalytics(analyticsInstance);
          } else {
            console.warn(
              "Firebase Analytics is not supported in this environment."
            );
          }
        })
        .catch((error) => {
          console.error("Failed to check Firebase Analytics support:", error);
        });
    }
  }, []);

  const logEvent = (eventName: string, eventParam: Record<string, any>) => {
    if (isDevMode) return;

    if (analytics) {
      try {
        firebaseLogEvent(analytics, eventName, eventParam);
      } catch (error) {
        console.error("Failed to log event:", error);
      }
    } else {
      console.warn(
        "Analytics instance is not initialized. Event not logged:",
        eventName
      );
    }
  };

  return { logEvent };
};

export default useAnalytics;
