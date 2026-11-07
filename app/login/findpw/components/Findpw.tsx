import "../styles/findpw.modules.sass";
import { FIND_PW_BTN_TEXT } from "../../consts/logIn";
import { SignUpTextField } from "../../../signup/components/SignUpTextField";
import useFindpw from "../hooks/useFindpw";

const FindpwComponent = () => {
  const {
    formProps,
    textFieldInfoProps,
    isSubmitDisabled,
    isLoading,
    resultType,
    resendProps,
    remaining,
  } = useFindpw();

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = String(sec % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="findpw-cont">
      <p className="findpw-title">
        방탈출 힌트폰 서비스 <br />
        넥스트룸 비밀번호 찾기
      </p>
      <form {...formProps}>
        <SignUpTextField {...textFieldInfoProps} />
        <button
          className="findpw-btn"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {FIND_PW_BTN_TEXT}
        </button>
      </form>

      {!isLoading && resultType && (
        <div className="findpw-sent">
          <div className="findpw-sent-header">
            <span
              className={`findpw-sent-icon ${
                resultType !== "success" ? "error" : ""
              }`}
            >
              {resultType === "success" ? (
                "✓"
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <path d="M5 5L19 19M19 5L5 19" />
                </svg>
              )}
            </span>

            <div className="findpw-sent-content">
              {resultType === "success" && (
                <>
                  <strong>비밀번호 재설정 링크를 발송했습니다.</strong>
                  <p>메일함과 스팸함을 확인해 주세요.</p>
                </>
              )}
              {resultType === "notFound" && (
                <>
                  <strong>가입되지 않은 이메일입니다.</strong>
                  <p>
                    해당 이메일로 가입된 계정이 없어
                    <br />
                    비밀번호 재설정 메일을 발송하지 않았습니다.
                  </p>
                </>
              )}
              {resultType === "google" && (
                <>
                  <strong>구글 계정으로 가입된 이메일입니다.</strong>
                  <p>
                    구글 계정의 비밀번호는 넥스트룸에서 변경할 수 없습니다.
                    <br />
                    구글 계정 설정에서 비밀번호를 변경해 주세요.
                  </p>
                </>
              )}
            </div>
          </div>

          {resultType === "success" && (
            <div className="findpw-resend">
              <div className="findpw-resend-info">
                <span>메일이 도착하지 않았나요?</span>

                <span className="findpw-timer">
                  {remaining > 0
                    ? `${formatTime(remaining)} 후 재발송 가능`
                    : "재발송할 수 있습니다"}
                </span>
              </div>

              <button
                {...resendProps}
                type="button"
                className="findpw-resend-btn"
                disabled={remaining > 0 || resendProps.disabled}
              >
                다시 보내기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindpwComponent;
