import { NEXT } from "../consts/signUp";
import usePassword from "../hooks/usePassword";

import HeaderLayoutComponent from "./HeaderLayout";
import { SignUpTextField } from "./inputs/TextField";

const PasswordComponent = () => {
  const { formProps, passwordProps, passwordConfirmProps, isValid } =
    usePassword();

  return (
    <>
      <HeaderLayoutComponent />

      <div className="signup-cont">
        <p className="signup-title">비밀번호를 입력해 주세요.</p>
        <p className="signup-sub-title">
          숫자 또는 기호를 포함하여 8자리 이상의 안전한 비밀번호를 만드세요
        </p>
        <form {...formProps}>
          <div className="signup-grid">
            <SignUpTextField {...passwordProps} />
          </div>
          <div className="signup-grid">
            <SignUpTextField {...passwordConfirmProps} />
          </div>
          <button className="signup-btn" type="submit" disabled={!isValid}>
            {NEXT}
          </button>
        </form>
      </div>
    </>
  );
};

export default PasswordComponent;
