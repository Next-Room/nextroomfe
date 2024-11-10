import { useSelectedHint } from "@/components/atoms/selectedHint.atom";
import { useCreateHint } from "@/components/atoms/createHint.atom";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useToastWrite } from "@/components/atoms/toast.atom";
import { getStatus } from "@/utils/localStorage";
import { subscribeLinkURL } from "@/admin-new/(consts)/sidebar";
import { GalleryImageProps } from "./consts/themeDrawerProps";
import { compressImage, convertToPng } from "./helpers/imageHelpers";

const ThemeDrawerAnswer = ({
  answerImages,
  setAnswerImages,
}: {
  answerImages: File[];
  setAnswerImages: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const status = getStatus();

  const [selectedHint, setSelectedHint] = useSelectedHint();
  const [, setCreateHint] = useCreateHint();
  const [imgCnt, setImgCnt] = useState<number>(3);
  const setToast = useToastWrite();
  const answerRef = useRef<string>("");

  // 가지고 있던 이미지 갯수를 빼줘서 남은 imgCnt 계산
  useEffect(() => {
    if (selectedHint.answerImageUrlList) {
      setImgCnt(
        3 - answerImages.length - selectedHint.answerImageUrlList.length
      );
    }
  }, [answerImages, selectedHint.answerImageUrlList]);

  // 이미지 파일 핸들러
  const handleAnswerFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (imgCnt === 0) {
      setToast({
        isOpen: true,
        title: "이미지는 3개까지 추가할 수 있습니다.",
        text: "",
      });
      return;
    }
    if (!e.target.files) {
      return;
    }
    const files: File[] = [];
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      try {
        const compressedFile = await compressImage(file);

        if (compressedFile.type !== "image/png") {
          const pngFile = await convertToPng(compressedFile);
          files.push(pngFile);
        } else {
          files.push(compressedFile);
        }
      } catch (error) {
        console.error("Image compression failed", error);
        files.push(file);
      }
    } else {
      files.push(file);
    }
    setAnswerImages((prev) => [...prev, ...files]);
  };

  const answerInputRef = useRef<HTMLInputElement>(null);

  const handleAnswerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!status?.includes("SUBSCRIPTION")) {
      e.preventDefault();
      window.open(subscribeLinkURL, "_blank", "noopener,noreferrer");
      return;
    }
    answerInputRef.current?.click(); // 숨겨진 input 클릭 트리거
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    answerRef.current = e.target.value;
    setCreateHint((prev) => ({ ...prev, answer: answerRef.current }));
  };

  // 힌트 추가 중 삭제 (로컬 이미지)
  const deleteLocalAnswerImg = (index: number) => {
    const newImages = [
      ...answerImages.slice(0, index),
      ...answerImages.slice(index + 1),
    ];
    setAnswerImages(newImages);
    if (answerInputRef.current) {
      answerInputRef.current.value = "";
    }
  };
  // 수정 시 삭제
  const deleteServerAnswerImg = (index: number) => {
    const answerServerImages = selectedHint.answerImageUrlList;
    const newImages = [
      ...answerServerImages.slice(0, index),
      ...answerServerImages.slice(index + 1),
    ];
    setSelectedHint((prev) => ({ ...prev, answerImageUrlList: newImages }));
    if (answerInputRef.current) {
      answerInputRef.current.value = "";
    }
  };

  return (
    <div className="drawer-answer">
      <div className="drawer-category-title">
        정답
        <button
          className="secondary_button28"
          type="button"
          onClick={handleAnswerClick}
        >
          <Image {...GalleryImageProps} />
          <input
            type="file"
            multiple
            onChange={handleAnswerFileChange}
            accept="image/*"
            style={{ display: "none" }}
            ref={answerInputRef}
          />
          이미지 추가
          {(answerImages.length > 0 ||
            selectedHint?.answerImageUrlList?.length > 0) &&
            `(${
              (answerImages.length || 0) +
              (selectedHint.answerImageUrlList?.length || 0)
            }) `}
        </button>
      </div>
      {selectedHint?.answerImageUrlList?.map((src, idx) => (
        <div className="drawer-images" key={src}>
          <div className="drawer-image-box">
            <img
              src={src}
              alt={`answer-preview-${src}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              className="drawer-image-dimmed"
              onClick={() => deleteServerAnswerImg(idx)}
            >
              <button className="button28" type="button">
                삭제하기
              </button>
            </div>
          </div>
        </div>
      ))}
      {answerImages.length > 0 && (
        <div className="drawer-images">
          {answerImages.map((file, index) => (
            <div key={file.name} className="drawer-image-box">
              <img
                src={URL.createObjectURL(file)}
                alt={`answer-preview-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                className="drawer-image-dimmed"
                onClick={() => deleteLocalAnswerImg(index)}
              >
                <button className="button28" type="button">
                  삭제하기
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <textarea
        className="drawer-content-textarea"
        placeholder="정답 내용을 입력해 주세요."
        onChange={handleAnswerChange}
        defaultValue={selectedHint.answer}
      />
    </div>
  );
};
export default ThemeDrawerAnswer;
