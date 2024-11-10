import ThemeTextField from "@/(shared)/(ThemeTextField)/Container";
import Image from "next/image";
import ThemeDrawerAnswer from "./ThemeDrawerAnswer";
import ThemeDrawerHint from "./ThemeDrawerHint";
import {
  codeTextFieldProps,
  HintImageProps,
  rateTextFieldProps,
  XImageProps,
} from "./consts/themeDrawerProps";
import useAddHint from "./hooks/useAddHint";
import { OnCloseDrawerType } from "./types/themeDrawerTypes";

const AddHintDrawer = ({ onCloseDrawer }: OnCloseDrawerType) => {
  const {
    handleSubmit,
    drawerRef,
    hintImages,
    setHintImages,
    answerImages,
    setAnswerImages,
    isDisabled,
    handleOpenHintModal,
  } = useAddHint({ onCloseDrawer });

  return (
    <form
      className="theme-drawer__container"
      onSubmit={handleSubmit}
      ref={drawerRef}
    >
      <div className="theme-drawer__title">
        <span>힌트</span>
        <button type="button" onClick={handleOpenHintModal}>
          <Image {...XImageProps} />
        </button>
      </div>

      <div className="theme-drawer__content">
        <div className="drawer-code">
          <ThemeTextField {...codeTextFieldProps} />
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
          <ThemeTextField {...rateTextFieldProps} />
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
        <button className="button40" type="submit" disabled={isDisabled}>
          추가하기
        </button>
      </div>
    </form>
  );
};
export default AddHintDrawer;
