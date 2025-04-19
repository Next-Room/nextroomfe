import Link from "next/link";

import { SIGN_UP_BTN_TEXT } from "@/signup/consts/signUp";

import Loader from "../../(shared)/components/Loader/Loader";
import useSignUp from "../hooks/useSignUp";

import { SignUpTextField } from "./inputs/TextField";
import HeaderLayoutComponent from "./HeaderLayout";

const SignUpComponent = () => {
  const { formProps, textFieldInfoProps, isValid, isLoading } = useSignUp();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeaderLayoutComponent />

      <div className="signup-cont">
        <p className="signup-title">
          방탈출 힌트폰 서비스 <br />
          넥스트룸을 무료로 사용해 보세요.
        </p>
        <p className="signup-sub-title">
          회원가입이 필요한 서비스이며,
          <Link
            href="https://held-notebook-420.notion.site/d7bea4318d754b61999e9cb6179a2f70?pvs=4"
            target="_blank"
          >
            개인정보처리방침
          </Link>
          이 적용됩니다.
        </p>
        <form {...formProps}>
          <SignUpTextField {...textFieldInfoProps} />
          <button className="signup-btn" type="submit" disabled={!isValid}>
            {SIGN_UP_BTN_TEXT}
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUpComponent;
