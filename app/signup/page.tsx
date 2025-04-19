"use client";

import { useLayoutEffect, useState } from "react";

import { useSignUpValue } from "@/(shared)/atoms/signup.atom";
import Loader from "@/(shared)/components/Loader/Loader";

import SignUpComponent from "./components/SignUp";
import EmailAuthComponent from "./components/EmailAuth";
import PasswordComponent from "./components/Password";
import StoreInfoComponent from "./components/StoreInfo";
import SignUpSuccessComponent from "./components/SignUpSuccess";
import SignUpWithGoogleComponent from "./components/SignUpWithGoogle";

function SignUpPage() {
  const useSignUpState = useSignUpValue();
  const [query, setQuery] = useState<string | null>(null);
  const [hasMouted, setHasMounted] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const data = window.location.search;
    setQuery(data);
    setHasMounted(true);
  }, []);

  if (!hasMouted) {
    return <Loader />;
  }
  if (query === null) {
    return <Loader />;
  }

  if (query) {
    return <SignUpWithGoogleComponent query={query} />;
  }

  switch (useSignUpState.level) {
    case 1:
      return <SignUpComponent />;
    case 2:
      return <EmailAuthComponent />;
    case 3:
      return <PasswordComponent />;
    case 4:
      return <StoreInfoComponent />;
    case 5:
      return <SignUpSuccessComponent />;
    default:
      return <Loader />;
  }
}

export default SignUpPage;
