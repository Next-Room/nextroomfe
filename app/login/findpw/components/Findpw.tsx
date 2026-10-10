import { FIND_PW_BTN_TEXT } from "../consts/findpw";
import useFindpw from "../hooks/useFindpw";

import { FindpwTextField } from "./FindpwTextField";

const FindpwComponent = () => {
  const {
    formProps,
    textFieldInfoProps,
    isSubmitDisabled,
    isSent,
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
        <FindpwTextField {...textFieldInfoProps} />
        <button
          className="findpw-btn"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {FIND_PW_BTN_TEXT}
        </button>
      </form>

      {isSent && (
        <div className="findpw-sent">
          <div className="findpw-sent-header">
            <span className="findpw-sent-icon">✓</span>

            <div className="findpw-sent-content">
              <strong>비밀번호 재설정 링크를 발송했습니다.</strong>
              <p>메일함과 스팸함을 확인해 주세요.</p>
            </div>
          </div>

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
        </div>
      )}
    </div>
  );
};

export default FindpwComponent;
