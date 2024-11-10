import React, { useEffect } from "react";

import SnackBar from "@/components/SnackBar/SnackBar";
import { useSnackBarInfo } from "@/components/atoms/snackBar.atom";
import CodeInput from "./CodeInput";
import * as S from "./SignUpView.styled";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = Record<string, any>;

function EmailAuthView(props: Props) {
  const {
    inputProps,
    minutes,
    second,
    formProps,
    signUpState,
    ReRequestButtonProps,
    errorMessage,
  } = props;

  const [snackInfo, setSnackBarInfo] = useSnackBarInfo();

  useEffect(() => {
    if (snackInfo.isOpen) {
      setTimeout(() => {
        setSnackBarInfo({ ...snackInfo, isOpen: false });
      }, 3000);
    }
  }, [setSnackBarInfo, snackInfo]);

  return (
    <S.Cont>
      <S.Title>
        {signUpState.email}으로
        <br />
        전송된 인증번호를 입력해 주세요.
      </S.Title>
      <S.SubTitle>
        남은 시간 {minutes}:{second}
      </S.SubTitle>

      <S.StyledBox {...formProps}>
        {/* <TextField {...adminCodeProps} /> */}
        <CodeInput {...inputProps} />
        <S.ReRequest>
          <p>인증메일을 받지 못하셨나요?</p>
          <br />
          <>
            <p>스팸메일함 확인 또는</p>
            <button type="button" {...ReRequestButtonProps}>
              재인증 요청
            </button>
          </>
        </S.ReRequest>
        <S.ServerErrorMessage>{errorMessage}</S.ServerErrorMessage>
      </S.StyledBox>
      <SnackBar
        open={snackInfo.isOpen}
        ment={snackInfo.message}
        vertical="top"
        horizontal="center"
        handleClose={() => setSnackBarInfo({ ...snackInfo, isOpen: false })}
      />
    </S.Cont>
  );
}

export default EmailAuthView;
