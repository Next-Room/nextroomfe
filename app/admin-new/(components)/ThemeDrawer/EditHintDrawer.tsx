import ThemeTextField from "@/(shared)/(ThemeTextField)/Container";
import Image from "next/image";
import { useSelectedHint } from "@/components/atoms/selectedHint.atom";

import ThemeDrawerAnswer from "./ThemeDrawerAnswer";
import ThemeDrawerHint from "./ThemeDrawerHint";
import {
  codeTextFieldProps,
  HintImageProps,
  rateTextFieldProps,
  XImageProps,
} from "./consts/themeDrawerProps";
import { OnCloseDrawerType } from "./types/themeDrawerTypes";
import useEditHint from "./hooks/useEditHint";

const EditHintDrawer = ({ onCloseDrawer }: OnCloseDrawerType) => {
  const [selectedHint] = useSelectedHint();
  const {
    handleSubmit,
    drawerRef,
    hintImages,
    setHintImages,
    answerImages,
    setAnswerImages,
    isDisabled,
    deleteHintBtn,
    handleOpenHintModal,
  } = useEditHint({ onCloseDrawer });

  return (
    <form
      className="theme-drawer__container"
      onSubmit={handleSubmit}
      ref={drawerRef}
      key={selectedHint.id}
    >
      <div className="theme-drawer__title">
        <span>힌트</span>
        <button type="button" onClick={handleOpenHintModal}>
          <Image {...XImageProps} />
        </button>
      </div>

      <div className="theme-drawer__content">
        <div className="drawer-code">
          <ThemeTextField
            {...codeTextFieldProps}
            content={selectedHint.hintCode.toString()}
          />
        </div>

        <div className="drawer-image-subtext-section">
          <div className="drawer-image-subtext-line" />
          <div className="drawer-image-subtext">보여질 내용</div>
        </div>

        <div className="drawer-image-section">
          <Image {...HintImageProps} />
        </div>

        <div className="drawer-rate">
          <div className="drawer-category-title">문제 진행률</div>
          <ThemeTextField
            {...rateTextFieldProps}
            content={selectedHint.progress.toString()}
          />
        </div>

        <ThemeDrawerHint
          hintImages={hintImages}
          setHintImages={setHintImages}
        />

        <ThemeDrawerAnswer
          answerImages={answerImages}
          setAnswerImages={setAnswerImages}
        />
      </div>

      <div className="theme-drawer__footer">
        <button
          className="outlined_button40"
          type="button"
          onClick={deleteHintBtn}
        >
          삭제하기
        </button>
        <button className="button40" type="submit" disabled={isDisabled}>
          저장하기
        </button>
      </div>
    </form>
  );
};
export default EditHintDrawer;
