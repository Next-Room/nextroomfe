import { useEffect, useState } from "react";
import "@/apis/firebase";
import { useRouter } from "next/navigation";
import useCheckSignIn from "@/hooks/useCheckSignIn";
import { setCookie } from "@/utils/cookie";
import useAnalytics from "@/hooks/useAnalytics";
import * as S from "./Component.styled";

export default function Inputbar(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false);
  const { logEvent } = useAnalytics();
  const router = useRouter();
  const isSignIn = useCheckSignIn();

  const navigateToTrial = () => {
    const url = isSignIn ? "/admin" : "/signup";
    setCookie("/");
    router.push(url);
    logEvent("btn_click", {
      firebase_screen: "homepage_input_contact",
      firebase_screen_class: "homepage_input_contact",
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
    <S.MainBtn onClick={navigateToTrial}> 지금 바로 시작하기 </S.MainBtn>
  ) : null;
}
