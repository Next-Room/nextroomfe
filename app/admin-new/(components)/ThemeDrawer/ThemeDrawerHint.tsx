import { useSelectedHint } from "@/components/atoms/selectedHint.atom";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useToastWrite } from "@/components/atoms/toast.atom";
import { useCreateHint } from "@/components/atoms/createHint.atom";
import { getStatus } from "@/utils/localStorage";
import { subscribeLinkURL } from "@/admin-new/(consts)/sidebar";
import { compressImage, convertToPng } from "./helpers/imageHelpers";
import { GalleryImageProps } from "./consts/themeDrawerProps";

const ThemeDrawerHint = ({
  hintImages,
  setHintImages,
}: {
  hintImages: File[];
  setHintImages: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const status = getStatus();

  const [selectedHint, setSelectedHint] = useSelectedHint();
  const [, setCreateHint] = useCreateHint();
  const hintRef = useRef<string>("");
  const [imgCnt, setImgCnt] = useState<number>(3);
  const setToast = useToastWrite();

  // 가지고 있던 이미지 갯수를 빼줘서 남은 imgCnt 계산
  useEffect(() => {
    if (selectedHint.hintImageUrlList) {
      setImgCnt(3 - hintImages.length - selectedHint.hintImageUrlList.length);
    }
  }, [hintImages, selectedHint.hintImageUrlList]);

  // 이미지 파일 핸들러
  const handleHintFileChange = async (
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
    setHintImages((prev) => [...prev, ...files]);
  };

  const hintInputRef = useRef<HTMLInputElement>(null);

  const handleHintClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!status?.includes("SUBSCRIPTION")) {
      e.preventDefault();
      window.open(subscribeLinkURL, "_blank", "noopener,noreferrer");
      return;
    }
    hintInputRef.current?.click(); // 숨겨진 input 클릭 트리거
  };

  const handleHintChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    hintRef.current = e.target.value;
    setCreateHint((prev) => ({ ...prev, contents: hintRef.current }));
  };
  // 힌트 추가 중 삭제 (로컬 이미지)
  const deleteLocalHintImg = (index: number) => {
    const newImages = [
      ...hintImages.slice(0, index),
      ...hintImages.slice(index + 1),
    ];
    setHintImages(newImages);
    if (hintInputRef.current) {
      hintInputRef.current.value = "";
    }
  };
  // 수정 시 삭제
  const deleteServerHintImg = (index: number) => {
    const hintServerImages = selectedHint.hintImageUrlList;
    const newImages = [
      ...hintServerImages.slice(0, index),
      ...hintServerImages.slice(index + 1),
    ];
    setSelectedHint((prev) => ({ ...prev, hintImageUrlList: newImages }));
    if (hintInputRef.current) {
      hintInputRef.current.value = "";
    }
  };

  return (
    <div className="drawer-hint">
      <div className="drawer-category-title">
        힌트
        <button
          className="secondary_button28"
          type="button"
          onClick={handleHintClick}
        >
          <Image {...GalleryImageProps} />
          <input
            type="file"
            multiple
            onChange={handleHintFileChange}
            accept="image/*"
            style={{ display: "none" }}
            ref={hintInputRef}
          />
          이미지 추가
          {(hintImages.length > 0 ||
            selectedHint?.hintImageUrlList?.length > 0) &&
            `(${
              (hintImages.length || 0) +
              (selectedHint.hintImageUrlList?.length || 0)
            }) `}
        </button>
      </div>
      {selectedHint?.hintImageUrlList?.map((src, idx) => (
        <div className="drawer-images" key={src}>
          <div className="drawer-image-box">
            <img
              src={src}
              alt={`hint-preview-${src}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              className="drawer-image-dimmed"
              onClick={() => deleteServerHintImg(idx)}
            >
              <button className="button28" type="button">
                삭제하기
              </button>
            </div>
          </div>
        </div>
      ))}
      {hintImages.length > 0 && (
        <div className="drawer-images" key="a">
          {hintImages.map((file, index) => (
            <div key={file.name} className="drawer-image-box">
              <img
                src={URL.createObjectURL(file)}
                alt={`hint-preview-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                className="drawer-image-dimmed"
                onClick={() => deleteLocalHintImg(index)}
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
        placeholder="힌트 내용을 입력해 주세요."
        onChange={handleHintChange}
        defaultValue={selectedHint.contents}
      />
    </div>
  );
};
export default ThemeDrawerHint;
