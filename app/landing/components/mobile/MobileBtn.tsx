import { JSX, useEffect, useState } from "react";
import "@/(shared)/utils/firebase";
import { useRouter } from "next/navigation";

import { setCookie } from "@/(shared)/auth/cookie";

import useCheckSignIn from "../../../(shared)/auth/hooks/useCheckSignIn";
import useAnalytics from "../../../(shared)/hooks/useAnalytics";

export default function Inputbar(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const isSignIn = useCheckSignIn();
  const { logEvent } = useAnalytics();

  const navigateToTrial = () => {
    const url = isSignIn ? "/admin" : "/signup";
    setCookie("/");
    router.push(url);
    logEvent("btn_click", {
      btn_name: "homepage_start_free_trial_click",
      btn_position: "floating",
    });
  };

  const toggleVisibility = () => {
    if (
      window.scrollY > 0 &&
      window.scrollY < document.body.scrollHeight - window.innerHeight
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return isVisible ? (
    <button className="main-btn" onClick={navigateToTrial}>
      {" "}
      지금 바로 시작하기{" "}
    </button>
  ) : null;
}
