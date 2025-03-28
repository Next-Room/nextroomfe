"use client";

import Link from "next/link";
import Image from "next/image";

import { SignUpTextField } from "@/signup/components/SignUpTextField";

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
  } = useLogIn();

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
          <button className={styles.loginBtn} type="submit">
            {LOGIN}
          </button>
        </div>
        <div className={styles.loginSignupBox}>
          관리자 계정이 필요하신가요?
          <button type="button" onClick={handleClickSignUpBtn}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogInComponent;
