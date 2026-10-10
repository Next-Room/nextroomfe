import { NEXT } from "../../../signup/consts/signUp";
import useResetpw from "../hooks/useResetpw";

import { ResetpwTextField } from "./ResetpwTextField";

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
    <div className="resetpw-cont">
      <p className="resetpw-title">
        방탈출 힌트폰 서비스 <br />
        넥스트룸 비밀번호 재설정
      </p>
      <p className="resetpw-sub-title">
        숫자 또는 기호를 포함하여 8자리 이상의 안전한 비밀번호를 만드세요
      </p>
      <form {...formProps}>
        <div className="resetpw-grid">
          <ResetpwTextField {...passwordProps} />
        </div>
        <div className="resetpw-grid">
          <ResetpwTextField {...passwordConfirmProps} />
        </div>
        <button
          className="resetpw-btn"
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
