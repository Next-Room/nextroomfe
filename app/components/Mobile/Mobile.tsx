import Image from "next/image";
import React from "react";
import * as S from "./Mobile.styled";

export default function Mobile() {
  return (
    <S.Wrap>
      <Image
        src="/images/svg/logo_mobile.svg"
        width={114}
        height={18}
        alt="NEXT ROOM"
      />
      <S.Title>PC로 접속해 주세요.</S.Title>
      <S.Description>
        넥스트룸 관리자 페이지는 PC 환경에 최적화 되어있습니다.
      </S.Description>
    </S.Wrap>
  );
}
