"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { END } from "@/signup/consts/signUp";

import Loader from "../../(shared)/components/Loader/Loader";
import useSignUpWithGoogle from "../hooks/useSignUpWithGoogle";
import { useGetGoogleCallbackData } from "../apis/getGoogleCallback";

import { SignUpTextField } from "./SignUpTextField";
import { SignUpDropDownField } from "./SignUpDropDownField";

const SignUpWithGoogleComponent = ({ query }: { query: string }) => {
  const router = useRouter();

  const params = new URLSearchParams(query);
  const code = params.get("code") ?? "";
  const errorParam = params.get("error");
  if (errorParam === "access_denied") {
    window.alert("권한이 없습니다. 로그인 페이지로 이동합니다.");
    router.push("/login");
  }

  const { data: callbackData, isLoading } = useGetGoogleCallbackData(code);

  const [isRedirecting, setIsRedirecting] = useState(false);
  useEffect(() => {
    if (callbackData?.isComplete === true) {
      setIsRedirecting(true);
      setTimeout(() => {
        router.push("/admin");
      }, 0);
    }
  }, [callbackData?.isComplete, router]);

  const {
    formProps,
    storeNameProps,
    pathDropDownProps,
    pathProps,
    reasonDropDownProps,
    reasonProps,
    totalCheckboxProps,
    requireCheckboxProps,
    adsCheckboxProps,
    isLoadingPut,
    errorMessage,
    disabled,
    isRedirectingPut,
  } = useSignUpWithGoogle();

  if (isLoading || isLoadingPut || isRedirecting || isRedirectingPut) {
    return <Loader />;
  }

  return (
    <div className="signup-cont">
      <p className="signup-title">
        방탈출 힌트폰 서비스 <br />
        넥스트룸 추가 정보 입력
      </p>
      <form {...formProps}>
        <SignUpTextField {...storeNameProps} />
        <SignUpDropDownField {...pathDropDownProps} />
        {pathDropDownProps.value === "기타" && (
          <SignUpTextField {...pathProps} />
        )}
        <SignUpDropDownField {...reasonDropDownProps} />
        {reasonDropDownProps.value === "기타" && (
          <SignUpTextField {...reasonProps} />
        )}

        <div className="signup-check-box-total">
          <label
            className="signup-check-box-label"
            aria-label={"모두 동의합니다."}
          >
            <input
              type="checkbox"
              className="signup-check-box-input"
              {...totalCheckboxProps}
            />
            <span>모두 동의합니다.</span>
          </label>
        </div>
        <label
          className="signup-check-box-label"
          aria-label={"서비스 이용약관"}
        >
          <input
            type="checkbox"
            className="signup-check-box-input"
            {...requireCheckboxProps}
          />
          <span>
            <Link
              href="https://nextroom-official.notion.site/38c311947d1d80618e61dfae7ad5d42b?pvs=74"
              target="_blank"
            >
              <u>서비스 이용약관</u>
            </Link>{" "}
            동의 <span className="signup-google-require">(필수)</span>
          </span>
        </label>
        <label
          className="signup-check-box-label"
          aria-label={"새로운 업데이트 소식 받기"}
        >
          <input
            type="checkbox"
            className="signup-check-box-input"
            {...adsCheckboxProps}
          />
          <span>새로운 업데이트 소식 받기</span>
        </label>

        <button className="signup-btn" type="submit" disabled={disabled}>
          {END}
        </button>
        <div className="signup-server-error-message">{errorMessage}</div>
      </form>
    </div>
  );
};

export default SignUpWithGoogleComponent;
