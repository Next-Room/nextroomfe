import { useCallback, useEffect } from "react";

import DialogView from "./DialogView";

type ContentType = "hintPut" | "themePut" | "hintPost" | "themePost";

interface Props {
  open: boolean;
  handleDialogClose: () => void;
  handleBtn: () => void;
  type: ContentType;
}

function Dialog(props: Props) {
  const { open, handleDialogClose, type, handleBtn } = props;

  const handleQuitDialog = useCallback(() => {
    handleBtn();
    handleDialogClose();
  }, [handleBtn, handleDialogClose]);

  useEffect(() => {
    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleQuitDialog();
      }
    };

    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, [handleQuitDialog]);

  // 힌트 함수 추가

  const content = {
    hintPost: {
      title: "힌트 추가를 그만두시겠어요?",
      description: "작성된 정보는 모두 사라집니다.",
    },
    themePost: {
      title: "테마 추가를 그만두시겠어요?",
      description: "작성된 정보는 모두 사라집니다.",
    },
    hintPut: {
      title: "힌트 수정을 그만두시겠어요?",
      description: "수정사항은 사라집니다.",
    },
    themePut: {
      title: "테마 수정을 그만두시겠어요",
      description: "수정사항은 사라집니다.",
    },
  };

  const DialogProps = {
    open,
    handleDialogClose,
    handleQuitDialog,
    content: { ...content[type] },
  };

  return <DialogView {...DialogProps} />;
}

export default Dialog;
