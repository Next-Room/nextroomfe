"use client";

import Link from "next/link";
import Image from "next/image";

import { SignUpTextField } from "@/signup/components/inputs/TextField";
import { handleClickGoogle } from "@/(shared)/auth/hooks/useAuth";

import styles from "../styles/login.module.sass";
import Loader from "../../(shared)/components/Loader/Loader";
import useLogIn from "../hooks/useLogIn";
import { LOGIN, logoImageProps } from "../consts/logIn";

const LogInComponent = () => {
  const {
    formProps,
    emailProps,
    passwordProps,
    isLoading,
    errorMessage,
    handleClickSignUpBtn,
    isValid,
  } = useLogIn();

  const GoogleIconProps = {
    src: "/images/svg/icon_google_signup.svg",
    alt: "google",
    width: 20,
    height: 20,
  };

  return (
    <div className={styles.loginWrapper}>
      {isLoading && <Loader />}
      <Link href="/">
        <Image {...logoImageProps} />
      </Link>

      <form className={styles.loginStyledBox} {...formProps}>
        <SignUpTextField {...emailProps} />
        <SignUpTextField {...passwordProps} />
        <div className={styles.loginBtnWrapper}>
          <div className={styles.loginServerErrorMessage}>{errorMessage}</div>
          <button className={styles.loginBtn} type="submit" disabled={!isValid}>
            {LOGIN}
          </button>
        </div>
      </form>
      <div className={styles.loginSignupContainer}>
        <div className={styles.loginSignupTextBox}>
          <div className={styles.loginSignupText}>
            ⚡️ 3초만에 빠른 회원가입
          </div>
          <div className={styles.loginSignupTextLine} />
        </div>
        <div
          className={styles.loginGoogleContainer}
          onClick={handleClickGoogle}
        >
          <Image {...GoogleIconProps} />
          <div>구글로 시작하기</div>
        </div>
        <div className={styles.loginSignupBox}>
          이메일로 가입을 원하시나요?
          <button type="button" onClick={handleClickSignUpBtn}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInComponent;
