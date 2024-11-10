"use client";

import React from "react";
import { useSignUpValue } from "@/components/atoms/signup.atom";
import SignUp from "./SignUp";
import EmailAuth from "./EmailAuth";
import Password from "./Password";
import StoreInfo from "./StoreInfo";
import SignUpSuccess from "./SignUpSuccess";

function HomePage() {
  const useSignUpState = useSignUpValue();

  switch (useSignUpState.level) {
    case 1:
      return <SignUp />;
    case 2:
      return <EmailAuth />;
    case 3:
      return <Password />;
    case 4:
      return <StoreInfo />;
    case 5:
      return <SignUpSuccess />;
    default:
      return <SignUp />;
  }
}

export default HomePage;
