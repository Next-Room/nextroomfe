"use client";

import "@/style/reset.css";
import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, TextField } from "@mui/material";

import {
  TRIAL_TITLE,
  CONTECT,
  EMAIL,
  SUBSCRIPTION,
  COMPLETE,
  CONTACT_CONFIRMATION,
  RETURN_HOME,
} from "@/consts/components/trial";
import "@/apis/firebase"; // Firebase 초기화 파일 임포트

import useAnalytics from "@/hooks/useAnalytics";
import * as S from "./TrialView.styled";

type Props = Record<string, any>;
function TrialView(props: Props) {
  const { formProps, emailProps, buttonProps, isComplete } = props;
  const { logEvent } = useAnalytics();
  useEffect(() => {
    logEvent("btn_click", {
      btn_name: "homepage_apply_free_trial",
    });
  }, [logEvent]);

  const navigateToLanding = () => {
    if (typeof window !== "undefined") {
      window.close();
      // 여기에 클라이언트-사이드 로직 추가
    }
  };

  const titleText = isComplete ? COMPLETE : TRIAL_TITLE;
  const contactText = isComplete ? CONTACT_CONFIRMATION : CONTECT;
  const mainActionButton = isComplete ? (
    <S.Btn onClick={navigateToLanding} {...buttonProps}>
      {RETURN_HOME}
    </S.Btn>
  ) : (
    <S.TextCont>
      <TextField placeholder={EMAIL} {...emailProps} />
      <S.Btn {...buttonProps}>{SUBSCRIPTION}</S.Btn>
    </S.TextCont>
  );

  return (
    <S.Wrapper {...formProps}>
      <S.BackWrapper>
        <IconButton
          size="small"
          color="inherit"
          id="basic-button"
          aria-label="go back"
          onClick={navigateToLanding}
        >
          <ArrowBackIcon />
        </IconButton>
      </S.BackWrapper>
      <S.Cont>
        <pre>
          <S.Title>{titleText}</S.Title>
        </pre>
        <S.Contect>{contactText}</S.Contect>
        {mainActionButton}
      </S.Cont>
    </S.Wrapper>
  );
}

export default TrialView;
