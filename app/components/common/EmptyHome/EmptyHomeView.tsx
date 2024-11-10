import React from "react";
import { HOME_TITLE } from "@/consts/components/home";
import AddIcon from "@mui/icons-material/Add";
import { useModalStateWrite } from "@/components/atoms/modalState.atom";
import { getShopName } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import * as S from "./EmptyHomeView.styled";

function EmptyHomeView() {
  const shopName = getShopName();
  const router = useRouter();
  const setModalState = useModalStateWrite();
  const toggleOnModalState = () => {
    router.push("/theme");
    setModalState({ type: "post", isOpen: true });
  };

  return (
    <S.Wrapper>
      <S.Title>
        {shopName?.replaceAll(`"`, "")}의<br />
        {HOME_TITLE}
      </S.Title>
      <S.AddButton
        variant="contained"
        onClick={toggleOnModalState}
        startIcon={<AddIcon />}
      >
        새로운 테마 추가하기
      </S.AddButton>
    </S.Wrapper>
  );
}

export default EmptyHomeView;
