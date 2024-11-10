import { useSignUpValue } from "@/components/atoms/signup.atom";
import { usePostVerification } from "@/mutations/postVerification";
import React, { useRef, useEffect } from "react";
import * as S from "./SignUpView.styled";

interface Props {
  disabled: boolean;
  numbers: string[];
  setNumbers: (newNumbers: string[]) => void;
}

export default function CodeInput(props: Props) {
  const { disabled, numbers, setNumbers } = props;
  const inputRefs = useRef(Array(6).fill(null)); // 6개의 ref를 저장할 배열

  const { mutateAsync: postVerification, isError = false } =
    usePostVerification();
  const signUpState = useSignUpValue();

  const handleInputChange = (index: number, value: string) => {
    // 입력값이 숫자가 아니거나 길이가 1을 넘어가면 입력을 막음
    if (!/^\d$/.test(value)) return;

    const newNumbers = [...numbers]; // 기존 숫자 배열 복사
    newNumbers[index] = value; // 해당 인덱스의 값을 업데이트
    setNumbers(newNumbers); // 업데이트된 배열을 상태로 설정

    // 다음 인풋 필드로 포커스 이동
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0].focus();
    }, 1000);
  }, []);

  useEffect(() => {
    const isInputComplete = numbers.every((number: string) => number !== "");
    if (isInputComplete) {
      const code = numbers.join("");
      postVerification({ code, email: signUpState.email });
      if (isError) {
        setTimeout(() => {
          setNumbers(Array(6).fill(""));
          inputRefs.current[0].focus();
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numbers, isError]);

  // 입력값을 삭제하는 함수
  const handleInputDelete = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const newNumbers = [...numbers];
      newNumbers[index] = "";
      setNumbers(newNumbers);

      // 이전 인풋 필드로 포커스 이동
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <S.CodeWrap>
      {numbers.map((number, index) => (
        <S.CodeInput
          type="number"
          value={number}
          error={isError && numbers.join("").length === 0}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleInputDelete(index, e)} // 삭제 이벤트 처리
          maxLength={1} // 한 글자만 입력할 수 있도록 설정
          // eslint-disable-next-line no-return-assign
          ref={(input) => (inputRefs.current[index] = input)} // ref를 배열에 저장
          disabled={disabled}
          inputMode="numeric"
        />
      ))}
    </S.CodeWrap>
  );
}
