import { useRouter, usePathname } from "next/navigation";

import { useIsLoggedInWrite } from "../../atoms/account.atom";
import { useAsPathStateWrite } from "../../atoms/signup.atom";
import { removeLocalStorageAll } from "../storageUtil";
import useChannelTalk from "../../hooks/useChannelTalk";

import useCheckSignIn from "./useCheckSignIn";

export const handleClickGoogle = () => {
  const URL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email profile`;
  window.location.href = URL;
};

const useAuth = () => {
  const setIsLoggedIn = useIsLoggedInWrite();

  const router = useRouter();
  const pathName = usePathname();
  const isSignIn = useCheckSignIn();
  const setAsPathState = useAsPathStateWrite();
  const handleLogout = () => {
    removeLocalStorageAll();
    setIsLoggedIn(false);
  };
  setAsPathState(pathName);

  useChannelTalk();

  const handleSignUpBtn = () => {
    if (isSignIn) {
      router.push("/admin");
    } else {
      handleClickGoogle();
    }
  };

  const handleLoginBtn = () => {
    isSignIn ? handleLogout() : router.push("/login");
  };

  const LoginLinkProps = {
    title: isSignIn ? "로그아웃" : "로그인",
    onClick: handleLoginBtn,
  };

  const SignUpLinkProps = {
    title: isSignIn ? "관리자 페이지로 가기" : "무료로 시작하기",
    onClick: handleSignUpBtn,
  };

  return {
    LoginLinkProps,
    SignUpLinkProps,
  };
};

export default useAuth;
