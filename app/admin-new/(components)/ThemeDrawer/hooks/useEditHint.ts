import { useState, useEffect, FormEvent, useRef } from "react";
import HintDialog from "@/components/common/Hint-Dialog-new/Dialog";
import { useSelectedHint } from "@/components/atoms/selectedHint.atom";
import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
import { useCreateHint } from "@/components/atoms/createHint.atom";
import useClickOutside from "@/hooks/useClickOutside";
import useHintUpload from "@/queries/getPreSignedUrl";
import useModal from "@/hooks/useModal";
import extractFilename from "@/utils/helper";
import { OnCloseDrawerType } from "../types/themeDrawerTypes";
// import cloneDeep from "lodash/cloneDeep";

const useEditHint = ({ onCloseDrawer }: OnCloseDrawerType) => {
  const selectedTheme = useSelectedThemeValue();
  const [selectedHint] = useSelectedHint();

  const [hintImages, setHintImages] = useState<File[]>([]);
  const [answerImages, setAnswerImages] = useState<File[]>([]);

  const [createHint, setCreateHint] = useCreateHint();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const isSameHint =
    String(createHint.hintCode) === String(selectedHint.hintCode) &&
    Number(createHint.progress) === Number(selectedHint.progress) &&
    String(createHint.contents) === String(selectedHint.contents) &&
    String(createHint.answer) === String(selectedHint.answer) &&
    // TODO: 이거 왜 계속 같이 업데이트 되는지 모르겠음... 딥카피 왜안됨 ...????? 몰카냐..
    // 서버에 올라간 사진 삭제 여부를 비교
    // prevHintImages === selectedHint.hintImageUrlList &&
    // prevAnswerImages === selectedHint.answerImageUrlList &&
    // 로컬에서 새로 업로드 한 사진 있는지 비교
    Boolean(!hintImages.length) &&
    Boolean(!answerImages.length);
  console.log(createHint, selectedHint, isSameHint);
  useEffect(() => {
    const isImcomplete = !(
      createHint.hintCode &&
      createHint.progress &&
      createHint.contents &&
      createHint.answer
    );
    if (isSameHint || isImcomplete) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    isSameHint,
    createHint,
    selectedHint,
    hintImages.length,
    answerImages.length,
  ]);

  useEffect(() => {
    setCreateHint((prev) => ({
      ...prev,
      contents: selectedHint.contents,
      answer: selectedHint.answer,
    }));
  }, [selectedHint, setCreateHint]);

  const { handleProcess } = useHintUpload();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      themeId: selectedTheme.id, // 실제 테마 ID
      hintCode: createHint.hintCode,
      contents: createHint.contents,
      answer: createHint.answer,
      progress: createHint.progress,
      id: selectedHint.id,
      hintImageList:
        selectedHint?.hintImageUrlList?.length > 0
          ? selectedHint.hintImageUrlList.map((url) => extractFilename(url))
          : [],
      answerImageList:
        selectedHint?.answerImageUrlList?.length > 0
          ? selectedHint.answerImageUrlList.map((url) => extractFilename(url))
          : [],
    };
    try {
      await handleProcess(formData, hintImages, answerImages);
    } catch (error) {
      console.error(error);
    }
    onCloseDrawer();
  };
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

  const deleteHintBtn = () => {
    open(HintDialog, { type: "delete", fn: onCloseDrawer });
  };

  return {
    handleSubmit,
    drawerRef,
    hintImages,
    setHintImages,
    answerImages,
    setAnswerImages,
    isDisabled,
    deleteHintBtn,
    handleOpenHintModal,
  };
};

export default useEditHint;
