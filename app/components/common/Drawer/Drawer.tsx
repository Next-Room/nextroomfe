import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// eslint-disable-next-line import/no-extraneous-dependencies
import AddIcon from "@mui/icons-material/Add";
import { useModalState } from "@/components/atoms/modalState.atom";
import {
  InitialSelectedTheme,
  useSelectedTheme,
} from "@/components/atoms/selectedTheme.atom";
import { Theme, Themes } from "@/queries/getThemeList";
import Image from "next/image";
import { getAdminCode, getShopName } from "@/utils/localStorage";
import Dialog from "@/components/common/Dialog/Dialog";

import Link from "next/link";
import * as S from "./DrawerView.styled";

type Props = {
  categories: Themes;
};

const logoProps = {
  src: "/images/svg/logo.svg",
  alt: "NEXT ROOM",
  width: 184,
  height: 26,
};

function MainDrawer(props: Props) {
  const { categories } = props;
  const router = useRouter();

  const [selectedTheme, setSelectedTheme] = useSelectedTheme();
  const shopName = getShopName();
  const adminCode = getAdminCode();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalState, setModalState] = useModalState();
  const [focusedTheme, setFocusedTheme] = useState<Theme | null>(null); // 현재 선택된 테마를 저장할 상태 추가
  const [open, setOpen] = useState<boolean>(false);

  const toggleOnModalState = () => {
    router.push("/theme");
    setSelectedTheme(InitialSelectedTheme);

    setModalState({ type: "post", isOpen: true });
  };

  const handleDialog = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedTheme(categories[categories.length - 1]);
    }
  }, [categories, setSelectedTheme]);

  const handleListItemClick = (theme: Theme) => {
    setFocusedTheme(theme);
    if (modalState.isOpen) {
      handleDialog();
    } else {
      setSelectedTheme({ ...theme });
      router.push(`/admin?themeId=${encodeURIComponent(theme.id)}`);
    }
  };

  return (
    <S.ListWrap>
      <Box>
        <ListItem>
          <S.LogoWrapper>
            <Image {...logoProps} />
          </S.LogoWrapper>
        </ListItem>
      </Box>
      <S.ListWrap1>
        <Box>
          <S.ShopNameListItem>
            <S.ShopName color="inherit">
              {shopName?.replaceAll(`"`, "")}
            </S.ShopName>
          </S.ShopNameListItem>
          {[...categories].reverse().map((theme) => (
            <ListItem key={theme.id} title={theme.title}>
              <ListItemButton
                selected={selectedTheme.id === theme.id}
                onClick={() => {
                  handleListItemClick(theme);
                }}
              >
                <ListItemText
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {theme.title}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "14px",
            }}
          >
            <Button onClick={toggleOnModalState}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText>새로운 테마 추가하기</ListItemText>
            </Button>
          </ListItem>
        </Box>
        <Dialog
          open={open}
          handleBtn={() => {
            if (focusedTheme) {
              setModalState({ ...modalState, isOpen: false });
              setSelectedTheme({ ...focusedTheme });
              router.push(
                `/admin?themeId=${encodeURIComponent(focusedTheme.id)}`
              );
            }
          }}
          handleDialogClose={() => setOpen(false)}
          type={modalState.type === "post" ? "themePost" : "themePut"}
        />
      </S.ListWrap1>
      <div>
        <S.CodeWrap>
          관리자 코드
          <br />
          <span>🔑 {adminCode?.replaceAll(`"`, "")}</span>
          힌트를 추가 및 수정했다면 힌트폰 앱에서 반드시 업데이트 버튼을
          눌러주세요.
        </S.CodeWrap>
        <S.GuideList
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            href="https://held-notebook-420.notion.site/134ed57b9c574733b31feab0ea5c36a5"
            target="_blank"
            style={{ textDecoration: "unset", color: "white" }}
          >
            넥스트룸 사용자 가이드
          </Link>
        </S.GuideList>
      </div>
    </S.ListWrap>
  );
}

export default MainDrawer;
