// Drawer.component.tsx
import React from "react";
import {
  List,
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components"; // 정확한 import 구문 사용

// 스타일 컴포넌트
export const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 20px 0;
  color: #21005d;
`;

export const ShopName = styled(ListItemText)`
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: 400;
  margin: 18px !important;
  color: rgba(255, 255, 255, 0.7);
`;

export const ShopNameListItem = styled(ListItem)`
  margin-bottom: 14px;
`;

export const Wrapper = styled.div`
  width: 360px;
  height: 100%;
  min-height: 100vh;
  padding: 12px;
  box-sizing: border-box;
  border-right: #ffffff20 solid 1px;
  background-image: url("/images/drawer/background.png");
  background-repeat: no-repeat;
  background-position: center bottom;
`;

export const ListWrap = styled(List)`
  width: 360px;
  min-width: 360px;
  height: 100%;
  min-height: 100vh;
  padding: 12px;
  box-sizing: border-box;
  border-right: #ffffff20 solid 1px;
  background-image: url("/images/drawer/background.png");
  background-repeat: no-repeat;
  background-position: center bottom;
  overflow-y: auto;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  width: 336px;
  height: 56px;
`;

export const Theme = styled(ListItemText)`
  font-size: 1rem;
  font-weight: 400;

  line-height: 50%;
`;

export const NewTheme = styled(Button)`
  width: 224px;
  height: 36px;
`;

function MainDrawer() {
  return (
    <ListWrap>
      <ListItem>
        <ListItemButton>
          <Theme>theme</Theme>
        </ListItemButton>
      </ListItem>
      <ListItem
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "14px",
          lineHeight: "30px",
        }}
      >
        <NewTheme>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <span>새로운 테마 추가하기</span>
        </NewTheme>
      </ListItem>
    </ListWrap>
  );
}

export default MainDrawer;
