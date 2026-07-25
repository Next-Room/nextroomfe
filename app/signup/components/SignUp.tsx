import Link from "next/link";

import { SIGN_UP_BTN_TEXT } from "@/signup/consts/signUp";

import Loader from "../../(shared)/components/Loader/Loader";
import useSignUp from "../hooks/useSignUp";

import { SignUpTextField } from "./SignUpTextField";

const SignUpComponent = () => {
  const { formProps, textFieldInfoProps, isValid, isLoading } = useSignUp();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="signup-cont">
      <p className="signup-title">
        방탈출 힌트폰 서비스 <br />
        넥스트룸을 무료로 사용해 보세요.
      </p>
      <p className="signup-sub-title">
        회원가입이 필요한 서비스이며,
        <Link
          href="https://nextroom-official.notion.site/38c311947d1d80618e61dfae7ad5d42b"
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
  );
};

export default SignUpComponent;
