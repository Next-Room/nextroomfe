import { useEffect } from "react";
import Image from "next/image";

import ModalPortal from "@/(shared)/components/Dialog/ModalPortal";
import { smallXProps } from "@/admin/(consts)/sidebar";

import { useGetHintDetail } from "../apis/getHintDetail";
import type { UsedHint } from "../apis/getLiveGames";
import { formatClock } from "../helpers/liveGame";

interface Props {
  themeId: number;
  themeTitle: string;
  usedHint: UsedHint;
  onClose: () => void;
}

export default function HintDetailDialog({
  themeId,
  themeTitle,
  usedHint,
  onClose,
}: Props) {
  const {
    data: hint,
    isLoading,
    isError,
  } = useGetHintDetail({ themeId, usedHint });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const renderBody = () => {
    if (isLoading) {
      return (
        <p className="hint-detail__message">힌트 내용을 불러오고 있어요</p>
      );
    }
    if (isError) {
      return (
        <p className="hint-detail__message">
          힌트 내용을 불러오지 못했어요. 잠시 후 다시 시도해 주세요
        </p>
      );
    }
    if (!hint) {
      return (
        <p className="hint-detail__message">
          힌트를 찾을 수 없어요. 게임 도중 삭제되었을 수 있어요
        </p>
      );
    }
    return (
      <>
        <section className="hint-detail__section">
          <h4 className="hint-detail__section-title">힌트</h4>
          <p className="hint-detail__text">{hint.contents}</p>
          {hint.hintImageUrlList?.length > 0 && (
            <div className="hint-detail__images">
              {hint.hintImageUrlList.map((src) => (
                <img key={src} src={src} alt="힌트 이미지" />
              ))}
            </div>
          )}
        </section>
        <section className="hint-detail__section">
          <h4 className="hint-detail__section-title">
            정답
            {usedHint.answerOpened && (
              <span className="hint-detail__answer-badge">
                플레이어가 확인함
              </span>
            )}
          </h4>
          <p className="hint-detail__text">{hint.answer}</p>
          {hint.answerImageUrlList?.length > 0 && (
            <div className="hint-detail__images">
              {hint.answerImageUrlList.map((src) => (
                <img key={src} src={src} alt="정답 이미지" />
              ))}
            </div>
          )}
        </section>
      </>
    );
  };

  return (
    <ModalPortal>
      <div className="hint-detail__backdrop" onClick={onClose}>
        <div
          className="hint-detail"
          role="dialog"
          aria-modal="true"
          aria-label={`힌트 ${usedHint.hintCode}`}
          onClick={(event) => event.stopPropagation()}
        >
          <header className="hint-detail__header">
            <div className="hint-detail__heading">
              <span className="hint-detail__theme">{themeTitle}</span>
              <h3 className="hint-detail__title">힌트 {usedHint.hintCode}</h3>
              <p className="hint-detail__meta">
                진행률 {usedHint.progress}% · {formatClock(usedHint.openedAt)}에
                열람
              </p>
            </div>
            <button
              type="button"
              className="hint-detail__close"
              aria-label="닫기"
              onClick={onClose}
            >
              <Image {...smallXProps} />
            </button>
          </header>
          <div className="hint-detail__body">{renderBody()}</div>
        </div>
      </div>
    </ModalPortal>
  );
}
