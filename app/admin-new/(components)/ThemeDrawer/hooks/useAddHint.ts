import { useRef, useState, FormEvent } from "react";
import HintDialog from "@/components/common/Hint-Dialog-new/Dialog";
import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
import { useCreateHint } from "@/components/atoms/createHint.atom";
import useClickOutside from "@/hooks/useClickOutside";
import useHintUpload from "@/queries/getPreSignedUrl";
import useModal from "@/hooks/useModal";
import { OnCloseDrawerType } from "../types/themeDrawerTypes";

const useAddHint = ({ onCloseDrawer }: OnCloseDrawerType) => {
  const selectedTheme = useSelectedThemeValue();
  const [createHint] = useCreateHint();

  const [hintImages, setHintImages] = useState<File[]>([]);
  const [answerImages, setAnswerImages] = useState<File[]>([]);

  const isDisabled = !(
    createHint.hintCode &&
    createHint.progress &&
    createHint.contents &&
    createHint.answer
  );

  const { handleProcess } = useHintUpload();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      themeId: selectedTheme.id, // 실제 테마 ID
      hintCode: createHint.hintCode,
      contents: createHint.contents,
      answer: createHint.answer,
      progress: createHint.progress,
      id: 0,
      hintImageList: [],
      answerImageList: [],
    };
    // TODO: API, Type 확인필요
    try {
      await handleProcess(formData, hintImages, answerImages);
    } catch (error) {
      console.error(error);
    }
    onCloseDrawer();
  };

  const isSameHint = !(
    String(createHint.hintCode) ||
    Number(createHint.progress) ||
    String(createHint.contents) ||
    String(createHint.answer) ||
    Boolean(hintImages.length) ||
    Boolean(answerImages.length)
  );

  const { open } = useModal();
  const handleOpenHintModal = () => {
    if (isSameHint) {
      onCloseDrawer();
    } else {
      open(HintDialog, { type: "put", fn: onCloseDrawer });
    }
  };
  const drawerRef = useRef(null);
  useClickOutside(drawerRef, handleOpenHintModal);

  return {
    handleSubmit,
    drawerRef,
    hintImages,
    setHintImages,
    answerImages,
    setAnswerImages,
    isDisabled,
    handleOpenHintModal,
  };
};

export default useAddHint;
