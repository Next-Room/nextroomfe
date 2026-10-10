import { NEXT } from "../../../signup/consts/signUp";
import { SignUpTextField } from "../../../signup/components/SignUpTextField";
import useResetpw from "../hooks/useResetpw";

const ResetpwComponent = () => {
  const {
    formProps,
    passwordProps,
    passwordConfirmProps,
    isValid,
    token,
    isLoading,
  } = useResetpw();

  return (
    <div className="signup-cont">
      <p className="signup-title">
        방탈출 힌트폰 서비스 <br />
        넥스트룸 비밀번호 재설정
      </p>
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
        <button
          className="signup-btn"
          type="submit"
          disabled={!isValid || isLoading}
        >
          {NEXT}
        </button>
      </form>
    </div>
  );
};

export default ResetpwComponent;
