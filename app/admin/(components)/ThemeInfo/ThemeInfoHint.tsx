import React from "react";
import classNames from "classnames";

import { useGetHintList } from "@/queries/getHintList";
import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
import HintDialog from "@/components/common/Dialog-new/Hint-Dialog-new/Dialog";
import {
  SelectedHintType,
  useSelectedHint,
  useSelectedHintReset,
} from "@/components/atoms/selectedHint.atom";
import {
  useCreateHint,
  useCreateHintReset,
} from "@/components/atoms/createHint.atom";
import { useDrawerState } from "@/components/atoms/drawer.atom";
import useModal from "@/hooks/useModal";

interface ThemeDrawerProps {
  handleHintCreate: (type: string) => void;
}

const ThemeInfoHint: React.FC<ThemeDrawerProps> = ({ handleHintCreate }) => {
  const { id: themeId } = useSelectedThemeValue();

  const { data: hints = [] } = useGetHintList({ themeId });
  const [selectedHint, setSelectedHint] = useSelectedHint();
  const [_, setCreateHint] = useCreateHint();
  const resetSelectedHint = useSelectedHintReset();
  const resetCreateHint = useCreateHintReset();
  const [drawer, setDrawer] = useDrawerState();
  const { open } = useModal();

  const handleResetCreateHint = () => {
    resetSelectedHint();
    resetCreateHint();
    handleHintCreate("Add");
    setDrawer({ ...drawer, isOpen: true, hintType: "add" });
  };

  const handleAddHintBtn = () => {
    if (drawer.isOpen && !drawer.isSameHint) {
      open(HintDialog, {
        type: "put",
        fn: handleResetCreateHint,
      });
    } else handleResetCreateHint();
  };

  const handleEditHintBtn = (
    e: React.MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
    hintElement: SelectedHintType
  ) => {
    if (selectedHint.id === hintElement.id) return;
    if (drawer.isOpen && !drawer.isSameHint) {
      open(HintDialog, {
        type: "put",
        fn: () => {
          setSelectedHint(hintElement);
          setCreateHint(hintElement);
          handleHintCreate("Edit");
          setDrawer({ ...drawer, isOpen: true, hintType: "Edit" });
        },
      });
    } else {
      setSelectedHint(hintElement);
      setCreateHint(hintElement);

      handleHintCreate("Edit");
    }
    if (hintElement.id === selectedHint.id) {
      return;
    }
  };

  return (
    <div className="theme-hint__container">
      <div className="theme-hint__title">
        <span>힌트</span>
        <button
          className="secondary_button40"
          type="button"
          onClick={handleAddHintBtn}
        >
          추가하기
        </button>
      </div>
      <div className="theme-hint__table">
        <div className="table-header">
          <div className="table-code">
            <span>힌트코드</span>
          </div>
          <div className="table-rate">
            <span>진행률</span>
          </div>
          <div
            className={classNames("table-hint", {
              "drawer-open": drawer.isOpen,
            })}
          >
            <span>힌트 내용</span>
          </div>
          <div className="table-answer">
            <span>정답 내용</span>
          </div>
        </div>
        {hints.length > 0 ? (
          <ul className="table-content-box">
            {[...hints].reverse().map((hintElement: SelectedHintType) => {
              const {
                id,
                hintCode,
                contents,
                answer,
                progress,
                hintImageUrlList,
                answerImageUrlList,
              } = hintElement;
              return (
                <li
                  role="menuitem"
                  className={classNames(
                    "table-content-element-box table-header",
                    {
                      "table-content-element-box__selected":
                        selectedHint.id === id,
                    }
                  )}
                  key={`item-${themeId}-${id}`}
                  onClick={(e) => handleEditHintBtn(e, hintElement)}
                >
                  <div className="table-code">
                    <div className="code">{hintCode}</div>
                  </div>
                  <div className="table-rate">
                    <div className="rate">{progress}%</div>
                  </div>
                  <div
                    className={classNames("table-hint", {
                      "drawer-open": drawer.isOpen,
                    })}
                  >
                    <div className="hint-content">{contents}</div>
                    <div className="hint-images">
                      {hintImageUrlList?.map((_, index) => (
                        <div className="hint-image-box" key={index}>
                          <div className="hint-image" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="table-answer">
                    <div className="hint-content">{answer}</div>
                    <div className="hint-images">
                      {answerImageUrlList?.map((_, index) => (
                        <div className="hint-image-box" key={index}>
                          <div className="hint-image" />
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="table-content-box__none-hint">
            <div className="main-text">여기서 힌트를 추가해 보세요.</div>
            <div className="sub-text">아직 저장된 힌트가 없어요.</div>
            <button
              className="button40"
              type="button"
              onClick={handleAddHintBtn}
            >
              추가하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeInfoHint;
