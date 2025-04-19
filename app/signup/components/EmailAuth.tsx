import SnackBar from "@/(shared)/components/SnackBar/SnackBar";

import useEmailAuth from "../hooks/useEmailAuth";

import { CodeInput } from "./inputs/CodeInput";
import HeaderLayoutComponent from "./HeaderLayout";

const EmailAuthComponent = () => {
  const {
    inputProps,
    minutes,
    second,
    formProps,
    ReRequestButtonProps,
    errorMessage,
    signUpState,
  } = useEmailAuth();

  return (
    <>
      <HeaderLayoutComponent />

      <div className="signup-cont">
        <p className="signup-title">
          {signUpState.email}으로
          <br />
          전송된 인증번호를 입력해 주세요.
        </p>
        <p className="signup-sub-title">
          남은 시간 {minutes}:{second}
        </p>

        <div className="signup-styled-box" {...formProps}>
          {/* <TextField {...adminCodeProps} /> */}
          <CodeInput {...inputProps} />
          <div className="signup-re-request">
            <p>인증메일을 받지 못하셨나요?</p>
            <br />
            <>
              <p>스팸메일함 확인 또는</p>
              <button type="button" {...ReRequestButtonProps}>
                재인증 요청
              </button>
            </>
          </div>
          <div className="signup-server-error-message">{errorMessage}</div>
        </div>
        <SnackBar />
      </div>
    </>
  );
};

export default EmailAuthComponent;
